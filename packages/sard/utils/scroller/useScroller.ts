import { computed, ref } from 'vue'
import { useScrollBinding } from './useScrollBinding'
import type { Friction } from './Friction'
import type { Spring } from './Spring'
import { Scroll } from './Scroll'
import { useEasingAnimation } from './useEasingAnimation'
import { useScrollAnimation } from './useScrollAnimation'
import { clamp } from '../number'

/**
 * 计算当前滚动位置对应的 snap 索引。
 *
 * @param position 当前滚动偏移值
 * @param itemSize 单个项的高度或宽度
 */
function calculateSnapIndex(position: number, itemSize: number): number {
  return Math.round(Math.abs(position) / itemSize)
}

export interface ScrollerOptions {
  itemSize?: number
  scrollWidth?: number
  scrollHeight?: number
  friction?: Friction
  spring?: Spring
  onSnap: (index: number) => void
  onTap?: (event: TouchEvent) => void
}

/**
 * 触摸滚动器，负责处理触摸/鼠标滚动交互、惯性滚动、越界回弹和 snap 对齐。
 */
export function useScroller(options: ScrollerOptions) {
  /** 单项尺寸，用于 snap 计算 */
  let itemSize = options.itemSize || 0

  /** 可滚动范围大小 */
  let extent = 0

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
        options.onSnap(Math.round(Math.abs(position.value) / _itemSize))
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
   * 更新滚动范围、位置、itemSize，并根据变化派发事件与 snap 回调。
   */
  const update = (
    height: number,
    _itemSize: number,
    containerHeight: number,
    contentHeight: number,
  ) => {
    let nextExtent = 0
    const _position = position.value

    nextExtent = contentHeight - containerHeight

    position.value = -height

    if (position.value < -nextExtent) {
      position.value = -nextExtent
    } else {
      if (position.value > 0) {
        position.value = 0
      }
    }
    itemSize = _itemSize
    if (_position !== position.value) {
      options.onSnap(Math.round(Math.abs(position.value) / itemSize))
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
  const onTouchMove = (_x: number, y: number) => {
    status = 'drag'

    let nextPos = startPosition

    nextPos += y

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

    if (position.value > -extent && position.value < 0) {
      if ((Math.abs(y) < itemSize && Math.abs(o.y) < 300) || Math.abs(o.y) < 150) {
        snap()
        return
      }
    }

    scroll.set(position.value, o.y)

    const s = scroll.friction.position(100)
    const l = s % itemSize
    const c = Math.abs(l) > itemSize / 2 ? s - (itemSize - Math.abs(l)) : s - l
    if (c <= 0 && c >= -extent) {
      scroll.setVelocityByEnd(c)
    }

    status = 'scroll'
    scrollAnim.play(
      () => {
        const pos = scroll.position((Date.now() - scroll.startTime) / 1e3)
        position.value = pos
      },
      () => {
        status = 'idle'

        if (c <= 0 && c >= -extent) {
          scroll.setVelocityByEnd(c)
          position.value = c
        }

        // NOTE: 动态改变 contentHeight 时，确保不超出范围
        position.value = clamp(position.value, -extent, 0)

        options.onSnap(calculateSnapIndex(position.value, itemSize))
      },
    )
  }

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useScrollBinding(
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  )

  return {
    position: computed(() => position.value),
    update,
    scrollTo,
    isIdle,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
