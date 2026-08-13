import { usePageScroll } from './usePageScroll'

export function useReachBottom(callback: () => void, distance = 1) {
  const isScrollToBottom = () => {
    const scrollTop = document.documentElement.scrollTop
    const { clientHeight, scrollHeight } = document.documentElement
    return scrollTop + clientHeight >= scrollHeight - distance
  }

  usePageScroll(() => {
    if (isScrollToBottom()) {
      callback()
    }
  })
}
