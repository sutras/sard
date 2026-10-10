<template>
  <div ref="root" :class="bem.b()" :style="rootStyle">
    <div v-for="(track, trackIndex) in tracks" :key="trackIndex" :class="bem.e('track')">
      <div
        v-for="bullet in track.bullets"
        :key="bullet.key"
        :data-key="bullet.key"
        :class="bem.e('item')"
      >
        <slot name="item" :item="bullet.item" :index="bullet.index">
          {{ defaultItemText(bullet.item) }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { addUnit, createBem, cssVarName } from '../../utils'
import { useIntersectionObserver, useResizeObserver, useRtl } from '../../use'
import {
  type DanmakuProps,
  type DanmakuSlots,
  type DanmakuEmits,
  type DanmakuExpose,
  defaultDanmakuProps,
} from './common'

const props = withDefaults(defineProps<DanmakuProps<T>>(), defaultDanmakuProps)

defineSlots<DanmakuSlots<T>>()

const emit = defineEmits<DanmakuEmits>()

const bem = createBem('danmaku')

// ============================ 内部类型 ============================
interface QueueItem {
  item: T
  index: number
}

interface BulletView {
  key: number
  // 放入响应式 tracks 后 T 会被 UnwrapRef 包裹，这里用 any 避免类型不兼容
  item: any
  index: number
}

interface BulletRuntime {
  key: number
  trackIndex: number
  entry: QueueItem
  startX: number
  endX: number
  duration: number
  anim: Animation | null
  state: 'idle' | 'running' | 'paused' | 'done'
}

// ============================ 状态 ============================
const rootRef = useTemplateRef('root')

const tracks = ref<{ bullets: BulletView[] }[]>([])

const playing = ref(false)

const rootWidth = ref(0)

const isRtl = useRtl(rootRef)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.rowHeight != null) {
    style[cssVarName('danmaku-row-height')] = addUnit(props.rowHeight)
  }
  return style
})

// 非响应式运行时数据
const queue: QueueItem[] = []
const runtimeMap = new Map<number, BulletRuntime>()
const nextStartAt: number[] = []
const pausedWaits: number[] = []

let keySeq = 0
let sendSeq = 0
let finished = false

// 调度（requestAnimationFrame）
let rafId: number | null = null
let schedulerRunning = false

// 自动暂停（切后台 / 滚出视口）
const autoPaused = ref(false)
const pauseReasons = new Set<string>()

// ============================ 工具 ============================
const containerWidth = () => {
  return (
    rootWidth.value ||
    rootRef.value?.clientWidth ||
    (typeof window !== 'undefined' ? window.innerWidth : 0) ||
    375
  )
}

const queryBulletEl = (key: number) => {
  return rootRef.value?.querySelector<HTMLElement>(`[data-key="${key}"]`) || null
}

const defaultItemText = (item: T) => {
  return typeof item === 'string' || typeof item === 'number' ? String(item) : ''
}

const cancelBullet = (runtime: BulletRuntime) => {
  runtime.anim?.cancel()
  runtime.anim = null
}

const buildTracks = () => {
  const count = Math.max(1, Math.round(props.rows))
  tracks.value = Array.from({ length: count }, () => ({ bullets: [] }))
  nextStartAt.length = 0
  pausedWaits.length = 0
  for (let i = 0; i < count; i++) {
    nextStartAt.push(0)
    pausedWaits.push(0)
  }
}

const initQueue = () => {
  queue.length = 0
  for (const [index, item] of (props.list || []).entries()) {
    queue.push({ item, index })
  }
  finished = false
  for (let i = 0; i < pausedWaits.length; i++) {
    pausedWaits[i] = 0
  }
}

const enqueue = (item: T, index: number) => {
  queue.push({ item, index })
}

const dequeue = () => {
  return queue.shift()
}

const clearAllBullets = () => {
  for (const runtime of runtimeMap.values()) {
    cancelBullet(runtime)
  }
  runtimeMap.clear()
  for (const track of tracks.value) {
    track.bullets = []
  }
  for (let i = 0; i < nextStartAt.length; i++) {
    nextStartAt[i] = 0
  }
}

// ============================ 弹幕动画 ============================
const startBullet = (el: HTMLElement, runtime: BulletRuntime) => {
  const anim = el.animate(
    [
      { transform: `translate3d(${runtime.startX}px, -50%, 0)` },
      { transform: `translate3d(${runtime.endX}px, -50%, 0)` },
    ],
    { duration: runtime.duration, easing: props.easing },
  )

  runtime.anim = anim
  runtime.state = 'running'

  anim.onfinish = () => {
    finishBullet(runtime)
  }
}

const pauseBullet = (runtime: BulletRuntime) => {
  if (runtime.state !== 'running') {
    return
  }
  runtime.anim?.pause()
  runtime.state = 'paused'
}

const resumeBullet = (runtime: BulletRuntime) => {
  if (runtime.state !== 'paused') {
    return
  }
  runtime.anim?.play()
  runtime.state = 'running'
}

const finishBullet = (runtime: BulletRuntime) => {
  if (runtime.state === 'done') {
    return
  }
  runtime.state = 'done'
  runtime.anim = null
  runtimeMap.delete(runtime.key)

  const track = tracks.value[runtime.trackIndex]
  const idx = track.bullets.findIndex((bullet) => bullet.key === runtime.key)
  if (idx !== -1) {
    track.bullets.splice(idx, 1)
  }

  if (props.loop) {
    enqueue(runtime.entry.item, runtime.entry.index)
  }

  checkFinish()
}

const launch = async (trackIndex: number, entry: QueueItem) => {
  const view: BulletView = {
    key: ++keySeq,
    item: entry.item,
    index: entry.index,
  }
  const runtime: BulletRuntime = {
    key: view.key,
    trackIndex,
    entry,
    startX: 0,
    endX: 0,
    duration: 0,
    anim: null,
    state: 'idle',
  }
  runtimeMap.set(view.key, runtime)
  tracks.value[trackIndex].bullets.push(view)

  // 先保守地推迟同轨道下一条弹幕的发射时间，避免测量前重复发射
  nextStartAt[trackIndex] = Date.now() + 1000

  await nextTick()

  const el = queryBulletEl(view.key)
  if (!el || runtime.state === 'done') {
    return
  }

  const width = containerWidth()
  const itemWidth = el.offsetWidth || 0
  const baseSpeed = props.speed > 0 ? props.speed : 100
  // 每条弹幕在基准速度上下浮动，避免整齐划一
  const speed =
    props.speedRange > 0
      ? Math.max(1, baseSpeed + (Math.random() * 2 - 1) * props.speedRange)
      : baseSpeed

  runtime.startX = isRtl.value ? -itemWidth : width
  runtime.endX = isRtl.value ? width : -itemWidth
  // 固定速度穿过：位移 = 容器宽 + 自身宽
  runtime.duration = ((width + itemWidth) / speed) * 1000
  // 尾端离开入场边缘并留出间距后，同轨道才允许发射下一条
  nextStartAt[trackIndex] = Date.now() + ((itemWidth + props.gap) / speed) * 1000

  startBullet(el, runtime)

  if (!playing.value) {
    pauseBullet(runtime)
  }
}

const checkFinish = () => {
  if (props.loop || queue.length > 0) {
    return
  }
  const hasActive = tracks.value.some((track) => track.bullets.length > 0)
  if (!hasActive && !finished) {
    finished = true
    stopScheduler()
    emit('finish')
  }
}

// ============================ 调度 ============================
const tick = () => {
  if (!playing.value) {
    return
  }

  const now = Date.now()
  const maxItems = props.maxItems > 0 ? props.maxItems : Infinity
  for (let i = 0; i < tracks.value.length; i++) {
    if (queue.length === 0 || runtimeMap.size >= maxItems) {
      break
    }
    if (now >= nextStartAt[i]) {
      const entry = dequeue()
      if (entry) {
        launch(i, entry)
      }
    }
  }

  if (queue.length === 0 && !props.loop) {
    const hasActive = tracks.value.some((track) => track.bullets.length > 0)
    if (!hasActive && !finished) {
      finished = true
      stopScheduler()
      emit('finish')
    }
  }
}

const loop = () => {
  if (!schedulerRunning) {
    return
  }
  tick()
  if (schedulerRunning) {
    rafId = requestAnimationFrame(loop)
  }
}

const startScheduler = () => {
  if (schedulerRunning) {
    return
  }
  schedulerRunning = true
  rafId = requestAnimationFrame(loop)
  // 立即执行一次，首批弹幕无需等待一帧
  tick()
}

const stopScheduler = () => {
  schedulerRunning = false
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

// ============================ 播放控制 ============================
const resume = () => {
  if (playing.value) {
    return
  }
  playing.value = true

  // 用暂停时记录的剩余等待时间重建各轨道发射时间，保持与冻结弹幕的相对节奏
  const now = Date.now()
  for (let i = 0; i < nextStartAt.length; i++) {
    nextStartAt[i] = now + (pausedWaits[i] ?? 0)
    pausedWaits[i] = 0
  }

  for (const runtime of runtimeMap.values()) {
    if (runtime.state === 'paused') {
      resumeBullet(runtime)
    }
  }

  startScheduler()
  emit('play')
}

const play = () => {
  if (finished && queue.length === 0) {
    initQueue()
  }
  resume()
}

const pause = () => {
  if (!playing.value) {
    return
  }
  playing.value = false
  // 记录各轨道剩余等待时间，恢复时据此重排，避免恢复瞬间齐发导致重叠
  const now = Date.now()
  for (let i = 0; i < nextStartAt.length; i++) {
    pausedWaits[i] = Math.max(0, nextStartAt[i] - now)
  }
  stopScheduler()

  for (const runtime of runtimeMap.values()) {
    if (runtime.state === 'running') {
      pauseBullet(runtime)
    }
  }

  emit('pause')
}

const stop = () => {
  playing.value = false
  autoPaused.value = false
  stopScheduler()
  clearAllBullets()
  // 重置队列，便于之后再次 play() 从头播放
  initQueue()
}

const send = (item: T) => {
  enqueue(item, sendSeq++)
  if (playing.value) {
    startScheduler()
  }
}

// ============================ 自动暂停 ============================
const syncAutoPause = () => {
  if (!props.autoPause) {
    return
  }
  if (pauseReasons.size > 0) {
    if (playing.value) {
      autoPaused.value = true
      pause()
    }
  } else if (autoPaused.value) {
    autoPaused.value = false
    resume()
  }
}

const onVisibilityChange = () => {
  if (document.hidden) {
    pauseReasons.add('hidden')
  } else {
    pauseReasons.delete('hidden')
  }
  syncAutoPause()
}

const { isIntersecting } = useIntersectionObserver({
  target: rootRef,
  disabled: () => !props.autoPause,
})

watch(
  isIntersecting,
  (value) => {
    if (value) {
      pauseReasons.delete('view')
    } else {
      pauseReasons.add('view')
    }
    syncAutoPause()
  },
  { immediate: true },
)

defineExpose<DanmakuExpose<T>>({
  play,
  pause,
  resume,
  stop,
  send,
})

// ============================ 生命周期 ============================
onMounted(() => {
  rootWidth.value = rootRef.value?.clientWidth || 0
  buildTracks()
  initQueue()

  document.addEventListener('visibilitychange', onVisibilityChange)

  if (props.autoPlay) {
    play()
  }
})

onBeforeUnmount(() => {
  stopScheduler()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  for (const runtime of runtimeMap.values()) {
    cancelBullet(runtime)
  }
  runtimeMap.clear()
})

useResizeObserver(rootRef, (size) => {
  rootWidth.value = size.width
})

// ============================ 监听 ============================
watch(
  () => props.rows,
  () => {
    const wasPlaying = playing.value
    stopScheduler()
    clearAllBullets()
    queue.length = 0
    buildTracks()
    initQueue()
    if (wasPlaying) {
      startScheduler()
    }
  },
)

watch(
  () => props.list,
  () => {
    const wasPlaying = playing.value
    stopScheduler()
    clearAllBullets()
    initQueue()
    if (wasPlaying) {
      startScheduler()
    }
  },
)
</script>
