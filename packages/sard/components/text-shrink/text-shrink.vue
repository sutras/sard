<template>
  <div ref="root" :class="rootClass">
    <!-- 文本层：可见文本 + 隐藏测量层。
         测量层之所以放在文本层内部，是为了让所有可继承的排版属性（font-*、letter-spacing、
         word-spacing、white-space、word-break、text-transform…）由继承自动对齐：
         兄弟节点之间不会互相继承，那种结构只能在 JS 里逐个搬运属性，搬漏一个就量不准。
         测量层绝对定位、脱离文档流，不影响可见文本的布局与固有宽度。
         用 v-text 而不是插值，保证它的内容永远是一个文本节点，Range 才能直接选它来数行。 -->
    <div ref="text" :class="textClass" :style="textStyle">
      <div ref="measure" :class="measureClass" aria-hidden="true" v-text="props.text"></div>
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type TextShrinkExpose,
  type TextShrinkProps,
  type TextShrinkSlots,
  defaultTextShrinkProps,
} from './common'

const props = withDefaults(defineProps<TextShrinkProps>(), defaultTextShrinkProps)

defineSlots<TextShrinkSlots>()

const bem = createBem('text-shrink')

/** 缩放下限：浏览器可渲染的最小字号 */
const MIN_FONT_SIZE = 1
/** 二分搜索收敛精度（px） */
const SEARCH_EPSILON = 0.05
/**
 * 尺寸比较容差。
 * 必须小于 1 个字号步进：单行渲染一旦溢出哪怕 0.5px，text-overflow 就会用省略号
 * 吃掉末尾一整个字，视觉上像“根本没放下”。这里只留吸收浮点误差的余量。
 */
const SIZE_TOLERANCE = 0.05
/** 宽度变化容差：小于它视为同一宽度，跳过重复适配 */
const WIDTH_TOLERANCE = 0.5
/** 单行按宽度外推分割点的次数上限，之后回到二分保证收敛 */
const INTERPOLATION_LIMIT = 2
/** 首次读到的 computed font-size 不可信时的兜底基准 */
const FALLBACK_BASE_FONT_SIZE = 16

const rootRef = useTemplateRef<HTMLElement>('root')
const measureRef = useTemplateRef<HTMLElement>('measure')
const textRef = useTemplateRef<HTMLElement>('text')

/** 当前生效字号，undefined 表示尚未完成首次适配 */
const fontSize = ref<number>()
/** 是否停在缩放下限后仍然溢出（已按 maxLines 截断） */
const overflow = ref(false)
/** 首次适配完成前隐藏可见层，避免以错误字号闪一下 */
const ready = ref(false)

const lines = computed(() => {
  const value = Math.floor(Number(props.maxLines))
  return Number.isFinite(value) && value > 1 ? value : 1
})

const singleLine = computed(() => lines.value === 1)

// ============================ 基准字号 ============================

// 基准字号一旦确定就固化：之后的重算都拿它当上界，
// 不再读 computed font-size，否则会把上次缩小后的结果当成新的基准，越缩越小。
let frozenBaseFontSize: number | undefined

function resolveBaseFontSize() {
  const { baseFontSize } = props

  if (typeof baseFontSize === 'number' && Number.isFinite(baseFontSize) && baseFontSize > 0) {
    return baseFontSize
  }

  if (frozenBaseFontSize !== undefined) {
    return frozenBaseFontSize
  }

  let value = FALLBACK_BASE_FONT_SIZE
  const root = rootRef.value

  if (root && typeof window !== 'undefined') {
    const measured = Number.parseFloat(window.getComputedStyle(root).fontSize)
    if (Number.isFinite(measured) && measured > 0) {
      value = measured
    }
  }

  frozenBaseFontSize = value
  return value
}

/**
 * 缩放下限：取 minFontSize，并夹在 [MIN_FONT_SIZE, baseFontSize] 之间。
 * 传 0 / 负数 / NaN 一律回退到浏览器可渲染下限，避免出现 0px 的死循环。
 */
function resolveMinFontSize(baseFontSize: number) {
  const { minFontSize } = props
  const value =
    typeof minFontSize === 'number' && Number.isFinite(minFontSize) && minFontSize > 0
      ? minFontSize
      : MIN_FONT_SIZE

  return Math.min(baseFontSize, Math.max(MIN_FONT_SIZE, value))
}

// ============================ 测量 ============================

interface ProbeResult {
  /** 能否在 maxLines 行内完整显示 */
  fits: boolean
  /** 单行模式的文本宽度；多行模式不读宽度，恒为 0 */
  width: number
}

/** 复用同一个 Range，避免每次测量都新建对象 */
let range: Range | undefined

function getRange() {
  if (!range && typeof document !== 'undefined') {
    range = document.createRange()
  }

  return range
}

/**
 * 以指定字号测量一次：写入字号后只读一次几何。
 * 单行读 Range 宽度（测量层此时不换行，宽度可以超出容器）；
 * 多行读 Range 的 rect 个数，一个文本节点每行对应一个 rect。
 * 读写之间会强制一次布局，所以不需要等 Vue 更新。
 */
function probeAt(size: number, available: number): ProbeResult {
  const measure = measureRef.value
  const node = measure?.firstChild
  const selection = getRange()

  // 空文本 / 尚未挂载时视为放得下，不写样式也不读几何
  if (!measure || !node || node.nodeType !== 3 || !selection) {
    return { fits: true, width: 0 }
  }

  measure.style.fontSize = `${size}px`
  selection.selectNodeContents(node)

  if (singleLine.value) {
    const { width } = selection.getBoundingClientRect()
    return { fits: width <= available + SIZE_TOLERANCE, width }
  }

  return { fits: selection.getClientRects().length <= lines.value, width: 0 }
}

/**
 * 在 (floorFontSize, baseFontSize] 区间内搜索能完整显示的最大字号。
 * 单行先用「宽度 ∝ 字号」外推两次把区间夹紧，多行直接二分；
 * 外推只决定下一个试探点，放不放得下始终由真实测量决定，精度不受影响。
 */
function search(baseFontSize: number, available: number, floorFontSize: number) {
  // 绝大多数情况基准字号就放得下，一次测量即可返回
  const atBase = probeAt(baseFontSize, available)
  if (atBase.fits) {
    return { size: baseFontSize, overflow: false }
  }

  // 缩放下限都放不下：不再继续缩小。
  // 字号停在下限，由可见层的 ellipsis / line-clamp 截断，这样至少保留可读的字号。
  if (!probeAt(floorFontSize, available).fits) {
    return { size: floorFontSize, overflow: true }
  }

  let lower = floorFontSize
  let upper = baseFontSize
  // 宽度曲线在小字号下会略偏宽（逐字 advance 取整，实测每 em 偏 5%~9%），
  // 但整体平滑，用它外推能少走几步；多行时 width 为 0，estimate 退化为 NaN，直接二分
  let estimate = atBase.width > 0 ? (baseFontSize * available) / atBase.width : Number.NaN
  let interpolations = 0

  while (upper - lower > SEARCH_EPSILON) {
    const useEstimate = interpolations < INTERPOLATION_LIMIT && estimate > lower && estimate < upper

    if (useEstimate) {
      interpolations += 1
    }

    const middle = useEstimate ? estimate : (lower + upper) / 2
    const result = probeAt(middle, available)

    if (!result.fits) {
      upper = middle
    } else if (result.width >= available - SIZE_TOLERANCE) {
      // 已经填满可用宽度，再大就溢出，可以直接结束搜索
      lower = middle
      break
    } else {
      lower = middle
    }

    estimate = result.width > 0 ? (middle * available) / result.width : Number.NaN
  }

  // 二分得到的是「刚好放下」的下界，先向下取整到 0.1px，
  // 再逐档向上验证，避免 10px 这种边界值被截成 9.9px
  const maxTenths = Math.floor(baseFontSize * 10)
  let tenths = Math.floor(lower * 10)

  while (tenths < maxTenths && probeAt((tenths + 1) / 10, available).fits) {
    tenths += 1
  }

  // 下限可能不是 0.1px 的整数倍（如 11.37），取整后不能掉到下限以下
  return { size: Math.max(floorFontSize, tenths / 10), overflow: false }
}

function fit() {
  const root = rootRef.value
  const text = textRef.value
  if (!root || !text) {
    return
  }

  // 宽度未就绪（父级 display:none、尚未布局、或根元素被改成行内元素）时不缩放，
  // 等 ResizeObserver 拿到有效宽度后再适配，避免算出 1px 的假结果。
  if (root.clientWidth <= 0) {
    return
  }

  // 可用宽度就是可见文本层的宽度，读一次后整个搜索过程复用
  const available = text.getBoundingClientRect().width
  if (available <= 0) {
    return
  }

  // 基准字号可能小于缩放下限（极端场景），此时以下限作为上界
  const baseFontSize = Math.max(MIN_FONT_SIZE, resolveBaseFontSize())
  const floorFontSize = resolveMinFontSize(baseFontSize)
  const result = search(baseFontSize, available, floorFontSize)

  fontSize.value = Math.max(floorFontSize, result.size)
  overflow.value = result.overflow
  ready.value = true

  // 记下这次适配用的宽度。ResizeObserver 注册后会立刻回调一次当前宽度，
  // 记下来就能直接跳过那次重复适配（内容宽度 = 文本层宽度，两者同一量纲）
  observedWidth = available
}

// ============================ 调度 ============================

const requestFrame = (callback: FrameRequestCallback) =>
  typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame(callback)
    : (setTimeout(callback, 16) as unknown as number)

const cancelFrame = (handle: number) => {
  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(handle)
  } else {
    clearTimeout(handle)
  }
}

let rafId = 0
let disposed = false
let resizeObserver: ResizeObserver | undefined
/** 上一次适配时的宽度，用来跳过 ResizeObserver 的重复回调 */
let observedWidth = -1

/** 同一帧内的多次触发合并成一次适配 */
function scheduleFit() {
  if (disposed || rafId !== 0) {
    return
  }

  rafId = requestFrame(() => {
    rafId = 0
    if (disposed) {
      return
    }
    fit()
  })
}

// text / maxLines / baseFontSize / minFontSize 变化时重算，且始终以固化的基准字号重新搜索
watch(
  () => [props.text, props.maxLines, props.baseFontSize, props.minFontSize],
  () => {
    scheduleFit()
  },
)

onMounted(() => {
  // 首次适配：挂载后样式已就绪，先同步算一次，缩短不可见时间
  fit()

  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0

      // 只关心宽度：字号变化只会改变高度，忽略掉可以避免自身触发的循环。
      // 首次回调会报一次刚适配过的宽度，这里一并跳过
      if (Math.abs(width - observedWidth) < WIDTH_TOLERANCE) {
        return
      }

      observedWidth = width
      scheduleFit()
    })

    resizeObserver.observe(rootRef.value)
  }

  // 网页字体加载完成后字符宽度会变，再适配一次；
  // 字体已经就绪时首次适配用的就是最终字形，不需要再算一遍
  if (typeof document !== 'undefined' && document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(() => {
      if (!disposed) {
        scheduleFit()
      }
    })
  }
})

onBeforeUnmount(() => {
  disposed = true
  resizeObserver?.disconnect()
  resizeObserver = undefined

  if (rafId !== 0) {
    cancelFrame(rafId)
    rafId = 0
  }
})

// ============================ 渲染 ============================

const rootClass = computed(() => [bem.b(), bem.is('measuring', !ready.value)])

const measureClass = bem.e('measure')

const textClass = computed(() => [
  bem.e('text'),
  singleLine.value ? bem.em('text', 'nowrap') : bem.em('text', 'clamp'),
])

const textStyle = computed<Record<string, string | number>>(() => {
  const style: Record<string, string | number> = {}

  if (fontSize.value !== undefined) {
    style.fontSize = `${fontSize.value}px`
  }

  if (!singleLine.value) {
    // 多行兜底：无论测量结果如何，最终渲染都不超过 maxLines 行
    style['-webkit-line-clamp'] = lines.value
  }

  return style
})

defineExpose<TextShrinkExpose>({
  fontSize,
  overflow,
  refit: scheduleFit,
})
</script>
