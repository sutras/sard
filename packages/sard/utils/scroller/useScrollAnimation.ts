import { ticker } from 'lwa'
import type { Scroll } from './Scroll'

/**
 * 创建一个基于 requestAnimationFrame 的动画循环。
 *
 * @param scroll 滚动模型
 * @param onScroll 每帧更新时回调
 * @param onEnd 动画结束时回调
 */
export function useScrollAnimation(scroll: Scroll) {
  let onScroll: (scroll: Scroll) => void
  let onEnd: (scroll: Scroll) => void

  const tick = () => {
    onScroll(scroll)

    if (scroll.done()) {
      pause()
      onEnd(scroll)
    }
  }

  const pause = () => {
    ticker.remove(tick)
  }

  const play = (_onScroll: () => void, _onEnd: (scroll: Scroll) => void) => {
    onScroll = _onScroll
    onEnd = _onEnd
    pause()
    tick()
    ticker.add(tick)
  }

  return {
    play,
    pause,
  }
}
