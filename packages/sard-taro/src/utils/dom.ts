import Taro, { SelectorQuery } from '@tarojs/taro'
import { TouchEvent } from 'react'
import { minmax, noop } from './index'
import { AnyFunction } from '../base'

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
  placement?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
  limited?: boolean
  pageHeight?: number
}

/**    
```
                      page               
                     ╱ 
    ╭───────────────╮    viewport
  ╭─│─ ─ ─ ─ ─ ─ ─ ─│─╮ ╱  
  │ │ ╭───────────╮ │ │
  │ │ │  element  │ │ │
  │ │ ╰───────────╯ │ │
  ╰─│─ ─ ─ ─ ─ ─ ─ ─│─╯
    │               │
    │               │
    ╰───────────────╯
```

# 对象
- viewport: 视窗
- page: 页面
- element: 元素

# 参数
- viewportHeight: 视窗高度
- viewportScrollTop: 视窗顶部滚动距离
- elementHeight: 元素高度
- elementToPageTopOffset: 元素距离页面顶部距离

# 选项
- placement: 元素在视窗中的位置(start, center, end, nearest)
- startOffset: 元素距离视窗顶部的偏移量
- endOffset: 元素距离视窗底部的偏移量
- limited: 是否限定视窗滚动的距离，让页面始终覆盖视窗；需要同时传递pageHeight选项
- pageHeight: 页面高度

# 结果值
- viewportScrollTop: 视窗顶部滚动的新的距离

*/
export function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementToPageTopOffset: number,
  options: ScrollIntoViewOptions = {},
) {
  const { startOffset = 0, endOffset = 0, pageHeight, limited } = options

  let placement = options.placement || 'nearest'

  const elementToViewportTopOffset = elementToPageTopOffset - viewportScrollTop
  const elementToViewportBottomOffset =
    elementToPageTopOffset + elementHeight - viewportScrollTop - viewportHeight

  if (placement === 'nearest') {
    if (elementToViewportTopOffset >= 0 && elementToViewportBottomOffset <= 0) {
      return viewportScrollTop
    } else {
      placement =
        Math.abs(elementToViewportTopOffset) >
        Math.abs(elementToViewportBottomOffset)
          ? 'end'
          : 'start'
    }
  }

  let nextScrollTop = 0

  switch (placement) {
    case 'start':
      nextScrollTop = elementToPageTopOffset - startOffset
      break
    case 'center':
      nextScrollTop =
        elementToPageTopOffset - (viewportHeight - elementHeight) / 2
      break
    case 'end':
      nextScrollTop =
        elementToPageTopOffset + elementHeight - viewportHeight + endOffset
      break
  }

  return limited
    ? minmax(nextScrollTop, 0, pageHeight - viewportHeight)
    : nextScrollTop
}

// todo: form, calendar需要用到
export const scrollIntoView: AnyFunction = noop

export type NodeRect = {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

// NodesRef.fields 的异步封装
export function getRectById(id: string, ctxId?: string) {
  return new Promise<NodeRect>((resolve) => {
    let query: SelectorQuery

    if (ctxId) {
      const element = document.getElementById(ctxId) as any
      if (element && element.ctx) {
        query = Taro.createSelectorQuery().in(element.ctx)
      }
    }

    if (!query) {
      query = Taro.createSelectorQuery()
    }

    query
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

interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
  contextId?: string
}

export async function matchScrollVisible(
  ids: string[],
  callback: (index: number, id: string) => unknown,
  options: MatchScrollVisibleOptions = {},
) {
  const { offset: optionOffset = 0, errorValue = 5, contextId } = options
  const offset = optionOffset + errorValue

  for (let i = 0, l = ids.length; i < l; i++) {
    const id = ids[i]

    const res = await getRectById(id, contextId)
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
