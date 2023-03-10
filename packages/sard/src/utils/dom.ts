import { MouseEvent, TouchEvent } from 'react'

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
export function getScrollParent(target: HTMLElement, root: HTMLElement) {
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
export const preventDefault = (event: Event | MouseEvent | TouchEvent) => {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }
}
