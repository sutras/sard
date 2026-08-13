import { computed, ref, watch, watchPostEffect, type Ref } from 'vue'
import { useScrollBinding } from './useScrollBinding'
import type { Friction } from './Friction'
import type { Spring } from './Spring'
import { Scroll } from './Scroll'
import { isFunction } from '../is'
import { useEasingAnimation } from './useEasingAnimation'
import { useScrollAnimation } from './useScrollAnimation'

/**
 * 计算当前滚动位置对应的 snap 索引。
 *
 * @param position 当前滚动偏移值
 * @param itemSize 单个项的高度或宽度
 */
function calculateSnapIndex(position: number, itemSize: number): number {
  return Math.round(Math.abs(position) / itemSize)
}

interface OnScrollEvent {
  target: {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
    offsetHeight: number
    offsetWidth: number
  }
}

export interface ScrollerOptions {
  enableSnap?: boolean
  itemSize?: number
  enableX?: boolean
  enableY?: boolean
  scrollWidth?: number
  scrollHeight?: number
  friction?: Friction
  spring?: Spring
  onScroll?: (event: OnScrollEvent) => void
  onSnap?: (index: number) => void
  onTap?: (event: TouchEvent) => void
}

/**
 * 触摸滚动器，负责处理触摸/鼠标滚动交互、惯性滚动、越界回弹和 snap 对齐。
 * @param element 滚动的 DOM 容器元素
 */
export function useScroller(element: Ref<HTMLElement | null>, options: ScrollerOptions) {
  /** 单项尺寸，用于 snap 计算 */
  let itemSize = options.itemSize || 0

  /** 是否启用 snap 对齐 */
  const enableSnap = computed(() => options.enableSnap)

  /** 是否启用水平滚动 */
  const enableX = computed(() => options.enableX)

  /** 是否启用垂直滚动 */
  const enableY = computed(() => options.enableY)

  /** 可滚动范围大小 */
  let extent = 0

  /** 可滚动内容宽度 */
  let scrollWidth = 0

  /** 可滚动内容高度 */
  let scrollHeight = 0

  /** 当前滚动偏移位置 */
  const position = ref(0)

  /** 滚动物理模型 */
  const scroll = new Scroll(extent, options.friction, options.spring)

  /** 触摸开始时的位置基准 */
  let startPosition = 0

  /** 当前滚动的状态 */
  let status: 'idle' | 'drag' | 'scroll' | 'easing' = 'idle'

  /** 缓动动画 */
  const easingAnim = useEasingAnimation(position)

  /** 滚动动画 */
  const scrollAnim = useScrollAnimation(scroll)

  /**
   * 将当前位置对齐到最近的 snap 项。
   */
  const snap = (time?: number) => {
    const _itemSize = itemSize
    const _position = position.value % _itemSize
    const i =
      Math.abs(_position) > _itemSize / 2
        ? position.value - (_itemSize - Math.abs(_position))
        : position.value - _position
    if (position.value !== i) {
      scrollTo(-i, time).then(() => {
        if (isFunction(options.onSnap)) {
          options.onSnap(Math.round(Math.abs(position.value) / _itemSize))
        }
      })
    } else {
      status = 'idle'
    }
  }

  /**
   * 直接滚动到指定位置。
   */
  const scrollTo = async (_position: number, time = 200) => {
    scrollAnim.pause()

    _position = -_position
    if (_position < -extent) {
      _position = -extent
    } else if (_position > 0) {
      _position = 0
    }
    status = 'easing'
    return easingAnim.play(_position, time).then(() => {
      status = 'idle'
    })
  }

  /**
   * 触发 onScroll 回调，仅在位置实际变化时执行。
   */
  const dispatchScroll = () => {
    const el = element.value
    if (!el) return

    if (isFunction(options.onScroll)) {
      const event: OnScrollEvent = {
        target: {
          scrollLeft: enableX.value ? -position.value : 0,
          scrollTop: enableY.value ? -position.value : 0,
          scrollHeight: scrollHeight || el.offsetHeight,
          scrollWidth: scrollWidth || el.offsetWidth,
          offsetHeight: el.parentElement!.offsetHeight,
          offsetWidth: el.parentElement!.offsetWidth,
        },
      }
      options.onScroll(event)
    }
  }

  /**
   * 更新滚动范围、位置、itemSize，并根据变化派发事件与 snap 回调。
   */
  const update = (height?: number, _scrollHeight?: number, _itemSize?: number) => {
    const el = element.value
    if (!el) return

    let nextExtent = 0
    const _position = position.value
    if (enableX.value) {
      nextExtent = el.childNodes.length
        ? (_scrollHeight || el.offsetWidth) - el.parentElement!.offsetWidth
        : 0
      scrollWidth = _scrollHeight || 0
    } else {
      nextExtent = el.childNodes.length
        ? (_scrollHeight || el.offsetHeight) - el.parentElement!.offsetHeight
        : 0
      scrollHeight = _scrollHeight || 0
    }
    if (typeof height === 'number') {
      position.value = -height
    }
    if (position.value < -nextExtent) {
      position.value = -nextExtent
    } else {
      if (position.value > 0) {
        position.value = 0
      }
    }
    itemSize = _itemSize || itemSize
    if (_position !== position.value) {
      if (isFunction(options.onSnap)) {
        options.onSnap(Math.round(Math.abs(position.value) / itemSize))
      }
    }
    extent = nextExtent
    scroll.extent = nextExtent
  }

  /**
   * 判断当前是否处于空闲
   */
  const isIdle = () => {
    return status === 'idle'
  }

  /**
   * 触摸开始时调用，停止现有动画并记录当前滚动位置。
   */
  const onTouchStart = () => {
    startPosition = position.value
    if (startPosition > 0) {
      startPosition /= 0.5
    } else if (startPosition < -extent) {
      startPosition = (startPosition + extent) / 0.5 - extent
    }
    scrollAnim.pause()
    easingAnim.pause()

    if (status !== 'idle') {
      status = 'drag'
    }
  }

  /**
   * 根据手势移动距离更新当前位置，并触发滚动事件。
   */
  const onTouchMove = (x: number, y: number) => {
    status = 'drag'

    let nextPos = startPosition
    if (enableX.value) {
      nextPos += x
    } else if (enableY.value) {
      nextPos += y
    }

    if (nextPos > 0) {
      nextPos *= 0.5
    } else if (nextPos < -extent) {
      nextPos = 0.5 * (nextPos + extent) - extent
    }
    position.value = nextPos
  }

  /**
   * 触摸结束时启动惯性滚动，必要时进行 snap 对齐。
   */
  const onTouchEnd = (x: number, y: number, o: { x: number; y: number }, event: TouchEvent) => {
    if (status === 'idle') {
      options.onTap?.(event)
      return
    }

    if (enableSnap.value && position.value > -extent && position.value < 0) {
      if (
        enableY.value &&
        ((Math.abs(y) < itemSize && Math.abs(o.y) < 300) || Math.abs(o.y) < 150)
      ) {
        snap()
        return
      }
      if (
        enableX.value &&
        ((Math.abs(x) < itemSize && Math.abs(o.x) < 300) || Math.abs(o.x) < 150)
      ) {
        snap()
        return
      }
    }
    if (enableX.value) {
      scroll.set(position.value, o.x)
    } else if (enableY.value) {
      scroll.set(position.value, o.y)
    }

    let c: number
    if (enableSnap.value) {
      const s = scroll.friction.position(100)
      const l = s % itemSize
      c = Math.abs(l) > itemSize / 2 ? s - (itemSize - Math.abs(l)) : s - l
      if (c <= 0 && c >= -extent) {
        scroll.setVelocityByEnd(c)
      }
    }
    status = 'scroll'
    scrollAnim.play(
      () => {
        const pos = scroll.position((Date.now() - scroll.startTime) / 1e3)
        position.value = pos
      },
      () => {
        status = 'idle'
        if (enableSnap.value) {
          if (c <= 0 && c >= -extent) {
            scroll.setVelocityByEnd(c)
            position.value = c
          }
          if (isFunction(options.onSnap)) {
            options.onSnap(calculateSnapIndex(position.value, itemSize))
          }
        }
      },
    )
  }

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useScrollBinding(
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  )

  watchPostEffect(() => {
    const el = element.value
    if (el) {
      let transform = ''
      if (enableX.value) {
        transform = 'translateX(' + position.value + 'px) translateZ(0)'
      } else if (enableY.value) {
        transform = 'translateY(' + position.value + 'px) translateZ(0)'
      }
      el.style.transform = transform
    }
  })

  watch(position, () => {
    dispatchScroll()
  })

  return {
    update,
    scrollTo,
    isIdle,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
