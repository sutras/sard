import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  toValue,
  watch,
  watchPostEffect,
  watchSyncEffect,
  type InjectionKey,
  type Ref,
  type VNode,
} from 'vue'
import { useSwiperData, type SwiperSlideData } from './useSwiperData'
import { useInitialVelocity, usePointerDown, useResizeObserver, useRtl } from '../../use'
import { useSwiperAnimation } from './useSwiperAnimation'
import type { SwiperEmits, SwiperPrivateProps } from './common'
import { clamp, isNullish } from '../../utils'
import { useSwiperAutoHeight } from './useSwiperAutoHeight'
import { useSwiperAutoPlay } from './useSwiperAutoPlay'
import { useSwiperNested } from './useSwiperNested'

type SwiperMember = SwiperSlideData

interface SwiperContext {
  autoHeight: Ref<boolean>
  spaceBetween: Ref<number>
  vertical: Ref<boolean>
  addMember: (member: SwiperMember) => void
  removeMember: (member: SwiperMember) => void
}

const swiperContextKey = Symbol('swiperContext') as InjectionKey<SwiperContext>

export function useSwiper(props: SwiperPrivateProps, emit: SwiperEmits) {
  const vertical = computed(() => toValue(props.vertical))

  const rootRef: Ref<HTMLElement | null> = ref(null)
  const wrapperRef: Ref<HTMLElement | null> = ref(null)

  const isRtl = useRtl()

  // ============================ members ============================

  let swiperItems: VNode[] | HTMLCollection = []

  const members = shallowRef<SwiperMember[]>([])

  function updateMembers(rawMembers: SwiperMember[]) {
    const _members: SwiperMember[] = []

    for (let i = 0; i < swiperItems.length; i++) {
      let swiperItem = swiperItems[i]
      if (!(swiperItem instanceof Element)) {
        swiperItem = swiperItem.el as HTMLElement
      }
      const member = rawMembers.find((member) => swiperItem === member.el)
      if (member) {
        _members.push(member)
      }
    }
    members.value = _members
  }

  provide(swiperContextKey, {
    autoHeight: toRef(() => props.autoHeight),
    spaceBetween: toRef(() => props.spaceBetween),
    vertical: toRef(() => !!props.vertical),
    addMember(member: SwiperMember) {
      updateMembers([...members.value, member])
    },
    removeMember(member: SwiperMember) {
      updateMembers(members.value.filter((m) => m !== member))
    },
  })

  const setSwiperItems = (_swiperItems: VNode[]) => {
    swiperItems = _swiperItems
  }

  // ============================ swiper data ============================
  const {
    offset,
    swiperSize,
    startEdge,
    endEdge,
    activeIndex,
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    centeredSlides,
    pageCount,
    loop,
    slides,
    setSlides,
    getNearestOffset,
    getPreviousNearestOffset,
    getNextNearestOffset,
    getNextIndexOffset,
    normalizeLoopOffset,
    snapTo,
  } = useSwiperData()

  watchSyncEffect(() => {
    slidesPerView.value = props.slidesPerView
    spaceBetween.value = props.spaceBetween
    slidesPerGroup.value = Math.floor(
      Math.max(Math.min(props.slidesPerGroup, props.slidesPerView), 1),
    )
    centeredSlides.value = props.centeredSlides
    loop.value = props.loop && slides.value.length > 1
  })

  watchPostEffect(() => {
    const wrapper = wrapperRef.value
    if (wrapper) {
      wrapper.style.setProperty('--swiper-offset-raw', offset.value + 'px')
    }
  })

  useResizeObserver(rootRef, (size) => {
    swiperSize.value = vertical.value ? size.height : size.width
  })

  watch(members, () => {
    setSlides(members.value)
  })

  // ============================ animation ============================
  const anim = useSwiperAnimation(offset)

  const slideTo = (
    { offset: _offset, index }: { offset: number; index: number },
    trigger = true,
  ) => {
    anim
      .play(_offset, props.speed, () => {
        if (loop.value) {
          offset.value = normalizeLoopOffset(offset.value)
        }
      })
      .then(() => {
        if (props.autoplay) {
          autoPlay()
        }
      })
    if (index !== activeIndex.value) {
      activeIndex.value = index

      if (trigger) {
        emit('update:modelValue', index)
        emit('change', index)
      }
    }
  }

  // ============================ outside change ============================
  activeIndex.value = Number(props.modelValue) || 0

  watch(
    () => props.modelValue,
    (index) => {
      if (!isNullish(index)) {
        index = clamp(~~index, 0, pageCount.value - 1)

        if (index !== activeIndex.value) {
          activeIndex.value = index
          snapTo(index)
        }
      }
    },
    {
      flush: 'post',
    },
  )

  onMounted(() => {
    snapTo(props.modelValue)
  })

  // ============================ interaction ============================
  let startX = 0
  let startY = 0
  let oldMoveX = 0
  let oldMoveY = 0
  let lockDirection: '' | 'x' | 'y' = ''
  let lossControl: boolean | null = null

  const { nestedParentContext } = useSwiperNested()

  const initVelocity = useInitialVelocity()

  const onTouchStart = (event: TouchEvent) => {
    if (!props.allowTouchMove) return

    const { clientX, clientY } = event.touches[0]
    startX = oldMoveX = clientX
    startY = oldMoveY = clientY

    anim.pause()
    stopAutoPlay()

    initVelocity.start(clientX, clientY)
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!props.allowTouchMove) return

    const { clientX, clientY } = event.touches[0]

    const deltaX = clientX - oldMoveX
    const deltaY = clientY - oldMoveY
    oldMoveX = clientX
    oldMoveY = clientY

    let delta = vertical.value ? deltaY : isRtl.value ? -deltaX : deltaX

    if (!lockDirection) {
      const dx = clientX - startX
      const dy = clientY - startY
      lockDirection = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'

      if (lossControl === null) {
        if (loop.value || !nestedParentContext) {
          lossControl = false
        } else {
          const atStartEdge = offset.value >= startEdge.value && delta > 0
          const atEndEdge = offset.value <= endEdge.value && delta < 0
          if (atStartEdge || atEndEdge) {
            lossControl = true
          }
        }
      }
    }

    if (
      lossControl ||
      (lockDirection === 'x' && vertical.value) ||
      (lockDirection === 'y' && !vertical.value)
    ) {
      return
    }

    event.stopImmediatePropagation()
    if (event.cancelable) {
      event.preventDefault()
    }

    // 边界弹簧
    if (!loop.value && (offset.value > startEdge.value || offset.value < endEdge.value)) {
      delta /= 4
    }

    let nextOffset = offset.value + delta
    if (loop.value) {
      nextOffset = normalizeLoopOffset(nextOffset)
    }
    offset.value = nextOffset

    initVelocity.move(clientX, clientY)
  }

  const onTouchEnd = () => {
    if (!props.allowTouchMove) return

    const velocity = initVelocity.end()

    if (vertical.value && Math.abs(velocity.y) > 0.5) {
      if (velocity.y < 0) {
        slideTo(getNextNearestOffset())
      } else {
        slideTo(getPreviousNearestOffset())
      }
    } else if (!vertical.value && Math.abs(velocity.x) > 0.5) {
      const velocityX = isRtl.value ? velocity.x * -1 : velocity.x
      if (velocityX < 0) {
        slideTo(getNextNearestOffset())
      } else {
        slideTo(getPreviousNearestOffset())
      }
    } else {
      slideTo(getNearestOffset())
    }

    lossControl = null
    lockDirection = ''
  }

  const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

  // ============================ auto height ============================
  useSwiperAutoHeight(
    rootRef,
    members,
    activeIndex,
    slidesPerGroup,
    () => props.autoHeight && !props.vertical,
  )

  // ============================ autoplay ============================
  const { autoPlay, stopAutoPlay } = useSwiperAutoPlay(
    () => {
      slideTo(getNextIndexOffset())
    },
    {
      delay: () => props.delay,
      enabled: () => props.autoplay,
    },
  )

  return {
    rootRef,
    wrapperRef,
    members,
    activeIndex,
    pageCount,
    setSwiperItems,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onPointerDown,
  }
}

export function useSwiperItem() {
  const elRef = ref<HTMLElement | null>(null)

  const member: SwiperMember = reactive({
    el: elRef,
    size: ref(0),
    offset: ref(0),
  })

  const context = inject(swiperContextKey)!

  onMounted(() => {
    context.addMember(member)
  })

  onUnmounted(() => {
    context.removeMember(member)
  })

  return {
    elRef,
    member,
    context,
  }
}
