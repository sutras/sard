import Taro from '@tarojs/taro'
import { TouchEvent } from 'react'

export function pageScrollTop(top: number, animated = true) {
  window.scrollTo({
    top,
    behavior: animated ? 'smooth' : 'auto',
  })
}

interface windowResizeHandler {
  (res: { windowWidth: number; windowHeight: number }): void
  __sard_listener: () => void
}

export function onWindowResize(listener: windowResizeHandler) {
  listener.__sard_listener = () => {
    listener({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }
  window.addEventListener('resize', listener.__sard_listener)
}

export function offWindowResize(listener: windowResizeHandler) {
  window.removeEventListener('resize', listener.__sard_listener)
}

export type AutoHeight = boolean | { minHeight?: number; maxHeight?: number }
// | { minRows?: number; maxRows?: number }

export function resizeTextArea(
  el: HTMLInputElement & HTMLTextAreaElement,
  autoHeight: AutoHeight,
) {
  if (!autoHeight) {
    return
  }

  el.style.height = 'auto'

  let height = el.scrollHeight

  if (autoHeight !== true) {
    const { minHeight = 0, maxHeight = Number.MAX_SAFE_INTEGER } = autoHeight
    height = Math.min(Math.max(minHeight, height), maxHeight)
  }

  el.style.height = height + 'px'
}

/**
 * @description: 获取目标元素在根元素内的可滚动的祖先元素
 * @param {HTMLElement} target 目标元素，通常为 Event.target
 * @param {HTMLElement} root 根元素
 * @return {HTMLElement}
 */
export function getScrollParent(
  target: HTMLElement,
  root: HTMLElement = document.documentElement,
) {
  let current = target

  while (current && current.nodeType === 1 && current !== root) {
    const { overflowY } = window.getComputedStyle(current)
    if (['scroll', 'auto', 'overlay'].includes(overflowY)) {
      return current
    }
    current = current.parentNode as HTMLElement
  }

  return root
}

/**
 * @description: 阻止浏览器默认行为
 * @param {Event} event
 * @return {void}
 */
export function preventDefault(event: Event | TouchEvent) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }
}

/**
 * @description: 获取元素的相对于指定元素的坐标
 * @param {HTMLElement} elem
 * @return {*}
 */
export function getOffset(
  elem: HTMLElement,
  root: HTMLElement = document.body,
) {
  let top = 0,
    left = 0

  if (elem && elem.nodeType === 1) {
    while (elem.offsetParent && elem !== root) {
      top += elem.offsetTop
      left += elem.offsetLeft
      elem = elem.offsetParent as HTMLElement
    }
    return { top: top, left: left }
  }
}

export type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'

export interface ScrollIntoViewOptions {
  block?: ScrollIntoViewPosition
  inline?: ScrollIntoViewPosition
  blockOffset?: number
  inlineOffset?: number
  topOffset?: number
  bottomOffset?: number
  leftOffset?: number
  rightOffset?: number
}

// todo
export function scrollIntoView(
  elem: HTMLElement,
  options: ScrollIntoViewOptions,
) {
  return
  const {
    block,
    inline,
    blockOffset = 0,
    inlineOffset = 0,
    topOffset = 0,
    bottomOffset = 0,
    leftOffset = 0,
    rightOffset = 0,
  } = options

  const scrollParent = getScrollParent(elem)

  const offset = getOffset(elem, scrollParent)

  function setScroll(
    Side: string,
    side: string,
    Size: string,
    position: ScrollIntoViewPosition,
    offsetValue: number,
    startOffset: number,
    endOffset: number,
  ) {
    const scrollValue = scrollParent[`scroll${Side}`] - startOffset
    const viewportSize = scrollParent[`client${Size}`] + startOffset + endOffset
    const offsetBegin = offset[side]
    const startValue = offsetBegin - scrollValue
    const elemSize = elem[`offset${Size}`]
    const endValue = offsetBegin + elemSize - scrollValue - viewportSize

    let stop = false

    if (position === 'nearest') {
      if (startValue >= 0 && endValue <= 0) {
        stop = true
      } else {
        position = Math.abs(startValue) > Math.abs(endValue) ? 'end' : 'start'
      }
    }

    if (!stop) {
      let nextScrollValue = 0

      switch (position) {
        case 'start':
          nextScrollValue = offsetBegin
          break
        case 'center':
          nextScrollValue = offsetBegin - (viewportSize - elemSize) / 2
          break
        case 'end':
          nextScrollValue = offsetBegin + elemSize - viewportSize
          break
      }

      scrollParent[`scroll${Side}`] = nextScrollValue + offsetValue
    }
  }

  if (block) {
    setScroll(
      'Top',
      'top',
      'Height',
      block,
      blockOffset,
      topOffset,
      bottomOffset,
    )
  }

  if (inline) {
    setScroll(
      'Left',
      'left',
      'Width',
      inline,
      inlineOffset,
      leftOffset,
      rightOffset,
    )
  }
}

export type NodeRect = {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

// NodesRef.fields 的异步封装
export function getRectById(id: string) {
  return new Promise<NodeRect>((resolve) => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .fields(
        {
          rect: true,
          size: true,
        },
        (res: NodeRect) => {
          resolve(res)
        },
      )
      .exec()
  })
}

/**
 * @description: 匹配元素列表中第一个位于滚动盒子可视区域的元素
 * @param {HTMLElement} elements 元素列表
 * @param {function} callback 匹配成功时回调
 * @param {number} offset 距离滚动盒子顶部的偏移量
 * @param {number} errorValue 误差值
 * @return {void}
 */
export async function matchScrollVisible(
  ids: string[],
  callback: (index: number, id: string) => unknown,
  offset = 0,
  errorValue = 5,
) {
  offset += errorValue

  for (let i = 0, l = ids.length; i < l; i++) {
    const id = ids[i]

    const res = await getRectById(id)
    if (res) {
      if (i === 0) {
        if (res.top > offset) {
          return callback(i, id)
        }
      } else if (i > 0 && i < l - 1) {
        if (res.top > offset) {
          return callback(i - 1, ids[i - 1])
        } else if (res.top <= offset && res.bottom > offset) {
          return callback(i, id)
        }
      } else {
        return callback(i, id)
      }
    }
  }
}
