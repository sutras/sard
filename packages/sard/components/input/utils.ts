import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { isObject } from '../../utils'
import type { InputAutoHeight, InputType } from './common'

export function resizeTextarea(el: HTMLTextAreaElement, autoHeight?: InputAutoHeight) {
  if (!autoHeight) return

  const scrollTop = window.scrollY
  el.style.height = 'auto'

  let height = el.scrollHeight
  if (isObject(autoHeight)) {
    const { maxHeight, minHeight } = autoHeight
    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight)
    }
    if (minHeight !== undefined) {
      height = Math.max(height, minHeight)
    }
  }

  if (height) {
    el.style.height = `${height}px`
    window.scrollTo({
      top: scrollTop,
      behavior: 'instant',
    })
  }
}

export function mapInputType(
  type: InputType,
  inputmode?: HTMLAttributes['inputmode'],
): {
  type: InputHTMLAttributes['type']
  inputmode?: HTMLAttributes['inputmode']
} {
  // type="number" is weird in iOS, and can't prevent dot in Android
  // so use inputmode to set keyboard in modern browsers
  if (type === 'number') {
    type = 'text'
    inputmode ??= 'decimal'
  }

  if (type === 'digit') {
    type = 'tel'
    inputmode ??= 'numeric'
  }

  return { type, inputmode }
}
