import { createEvent } from '../../utils/event.js'
import { useCallback } from 'react'

const event = createEvent()

let mWindow: Window

export function sendMessage(message: { type: string; data? }) {
  if (mWindow) {
    mWindow.postMessage(message, '*')
  }
}

export function useBuildChannel() {
  const handler = useCallback(
    ({
      data: { type, data },
    }: MessageEvent<{
      type: string
      data
    }>) => {
      event.emit(type, data)
    },
    [],
  )

  return {
    build(iframe: HTMLIFrameElement) {
      if (iframe) {
        mWindow = iframe.contentWindow
      }
      window.addEventListener('message', handler)
    },
    destroy() {
      window.removeEventListener('message', handler)
    },
  }
}

export function useChannel() {
  return {
    on(type: string, handler: (data) => void) {
      event.on(type, handler)
    },
    off(type: string, handler?: (data) => void) {
      event.off(type, handler)
    },
    emit(type: string, data) {
      sendMessage({
        type,
        data,
      })
    },
  }
}
