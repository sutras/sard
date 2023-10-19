import {
  getSystemInfoSync,
  pageScrollTo,
  createSelectorQuery,
  SelectorQuery,
} from '@tarojs/taro'
import { TouchEvent } from 'react'
import { minmax } from './utils'
import { isRN } from './is'
import { measure } from './measure'
import { isH5 } from './is'

export const systemInfo = getSystemInfoSync()

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

export interface ScrollIntoViewValueOptions {
  placement?: ScrollIntoViewPosition
  offsetStart?: number
  offsetEnd?: number
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
- offsetStart: 元素距离视窗顶部的偏移量
- offsetEnd: 元素距离视窗底部的偏移量
- limited: 是否限定视窗滚动的距离，让页面始终覆盖视窗；需要同时传递pageHeight选项（用于自定义滚动）
- pageHeight: 页面高度

# 结果值
- viewportScrollTop: 视窗顶部滚动的新的距离

*/
export function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementToPageTopOffset: number,
  options: ScrollIntoViewValueOptions = {},
) {
  const { offsetStart = 0, offsetEnd = 0, pageHeight, limited } = options

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
      nextScrollTop = elementToPageTopOffset - offsetStart
      break
    case 'center':
      nextScrollTop =
        elementToPageTopOffset - (viewportHeight - elementHeight) / 2
      break
    case 'end':
      nextScrollTop =
        elementToPageTopOffset + elementHeight - viewportHeight + offsetEnd
      break
  }

  return limited
    ? minmax(nextScrollTop, 0, (pageHeight as number) - viewportHeight)
    : nextScrollTop
}

export interface ScrollIntoViewOptions {
  behavior?: 'smooth' | 'instant'
  block?: 'start' | 'center' | 'end' | 'nearest'
  inline?: 'start' | 'center' | 'end' | 'nearest'

  contextId?: string
  offsetTop?: number
  offsetBottom?: number
}

/**
 * 滚动元素到页面指定位置
 *
 * @param pageScrollTop 当前页面滚动的距离
 * @param element 使用 ref 获取到元素
 *
 */
export async function scrollIntoView(
  pageScrollTop: number,
  element: any,
  options: ScrollIntoViewOptions = {},
) {
  const {
    contextId,
    block = 'start',
    behavior = 'instant',
    offsetTop = 0,
    offsetBottom = 0,
  } = options

  const windowHeight = systemInfo.windowHeight

  const scrollTop = pageScrollTop

  const elRect = await getRectByElement(element, contextId)

  const elHeight = elRect.height
  const elToPageTop = scrollTop + elRect.top

  // tips: rn ios 端的 windowHeight 是包括状态栏和导航栏的，和屏幕高度一致。
  const RNStartOffset = isRN ? (systemInfo.statusBarHeight || 0) + 44 : 0

  const nextScrollTop = getScrollIntoViewValue(
    windowHeight,
    scrollTop,
    elHeight,
    elToPageTop,
    {
      placement: block,
      offsetStart: offsetTop + RNStartOffset,
      offsetEnd: offsetBottom,
    },
  )

  pageScrollTo({
    scrollTop: nextScrollTop,
    duration: behavior === 'smooth' ? 300 : 0,
  })
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
export function getRectById(id: string, ctxId?: string) {
  return new Promise<NodeRect>((resolve) => {
    let query: SelectorQuery | undefined

    if (ctxId) {
      const element = document.getElementById(ctxId) as any
      if (element && element.ctx) {
        query = createSelectorQuery().in(element.ctx)
      }
    }

    if (!query) {
      query = createSelectorQuery()
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

// H5端获取元素位置和大小
function getRectByWebElement(element: any) {
  return new Promise<NodeRect>((resolve, reject) => {
    if (element instanceof Element) {
      const rect = element.getBoundingClientRect()
      resolve(rect)
    } else {
      reject()
    }
  })
}

/**
 * 命令式获取获取元素的大小和位置，兼容H5、小程序、RN
 *
 * @param element 通过 ref 获取的元素
 * @param ctxId 在小程序端如果使用 CustomWrapper 包裹元素，需要传递其id。
 */
export function getRectByElement(element: any, ctxId?: string) {
  if (isRN) {
    return measure(element)
  } else if (isH5) {
    return getRectByWebElement(element)
  } else {
    return getRectById(element.uid, ctxId)
  }
}

interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
  contextId?: string
  isRect?: boolean
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
  elementsOrRects: any[],
  callback: (index: number) => unknown,
  options: MatchScrollVisibleOptions = {},
) {
  const {
    offset: optionOffset = 0,
    errorValue = 5,
    contextId,
    isRect,
  } = options
  const offset = optionOffset + errorValue

  for (let i = 0, l = elementsOrRects.length; i < l; i++) {
    const elementOrRect = elementsOrRects[i]

    let rect: NodeRect

    if (isRect) {
      rect = elementOrRect
    } else {
      rect = await getRectByElement(elementOrRect, contextId)
    }

    if (rect) {
      if (i === 0) {
        if (rect.top > offset) {
          return callback(i)
        }
      } else if (i > 0 && i < l - 1) {
        if (rect.top > offset) {
          return callback(i - 1)
        } else if (rect.top <= offset && rect.bottom > offset) {
          return callback(i)
        }
      } else {
        return callback(i)
      }
    }
  }
}

export function getElementById(id?: string): any {
  if (id && typeof document === 'object' && document) {
    return document.getElementById(id)
  }
}

// 兼容pc端鼠标操作
export function createMouseBinder(options: {
  onStart?: (event: any) => void
  onMove?: (event: any) => void
  onEnd?: (event: any) => void
}) {
  const { onStart, onMove, onEnd } = options

  const handleMouseDown = (event) => {
    onStart?.(event)

    const handeMouseMove = (event) => {
      event.preventDefault()

      onMove?.(event)
    }

    const handeMouseUp = (event) => {
      document.removeEventListener('mousemove', handeMouseMove)
      document.removeEventListener('mouseup', handeMouseUp)

      onEnd?.(event)
    }

    document.addEventListener('mousemove', handeMouseMove)
    document.addEventListener('mouseup', handeMouseUp)
  }

  return {
    onMouseDown: handleMouseDown,
  }
}
