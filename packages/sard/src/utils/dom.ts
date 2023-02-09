const globalHost =
  (globalThis as any).wx ?? (globalThis as any).taro ?? globalThis

export function isMiniProgram() {
  return (globalThis as any).wx
  // if (typeof process != 'undefined') {
  //   return !!process.env.TARO_ENV
  // }
  // return false
}

export function pageScrollTop(top: number, animated = true) {
  if (isMiniProgram()) {
    globalHost.pageScrollTop({
      scrollTop: top,
      duration: animated ? 300 : 0,
    })
  } else {
    globalHost.scrollTo({
      top,
      behavior: animated ? 'smooth' : 'instant',
    })
  }
}

interface windowResizeHandler {
  (res: { windowWidth: number; windowHeight: number }): void
  __sard_listener: () => void
}

export function onWindowResize(listener: windowResizeHandler) {
  if (isMiniProgram()) {
    globalHost.onWindowResize(listener)
  } else {
    listener.__sard_listener = () => {
      listener({
        windowWidth: globalHost.innerWidth,
        windowHeight: globalHost.innerHeight,
      })
    }
    globalHost.addEventListener('resize', listener.__sard_listener)
  }
}

export function offWindowResize(listener: windowResizeHandler) {
  if (isMiniProgram()) {
    globalHost.offWindowResize(listener)
  } else {
    globalHost.removeEventListener('resize', listener.__sard_listener)
  }
}

export function getBoundingClientRect(
  id: string,
  callback: (rect: {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
  }) => void,
) {
  if (isMiniProgram()) {
    globalHost
      .createSelectorQuery()
      .select('#' + id)
      .boundingClientRect(callback)
      .exec()
  } else {
    const el = document.getElementById(id)
    if (el) {
      callback(el.getBoundingClientRect())
    }
  }
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
