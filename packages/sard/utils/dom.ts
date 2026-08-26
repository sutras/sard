export interface ViewportScrollInfo {
  scrollLeft: number
  scrollTop: number
}

export function toTouchEvent(event: MouseEvent | TouchEvent, end?: boolean) {
  if (!('touches' in event)) {
    const touches = [
      {
        clientX: event.clientX,
        clientY: event.clientY,
        pageY: event.pageY,
        pageX: event.pageX,
      },
    ]

    ;(event as any).changedTouches = touches
    ;(event as any).touches = end ? [] : touches
  }
  return event as TouchEvent
}

export function checkRtl(el: HTMLElement) {
  return el.dir.toLowerCase() === 'rtl' || getComputedStyle(el).direction === 'rtl'
}

export type ScrollElement = Element | Window

export function getScrollTop(el: ScrollElement): number {
  const top = 'scrollTop' in el ? el.scrollTop : el.scrollY
  return Math.max(top, 0)
}
