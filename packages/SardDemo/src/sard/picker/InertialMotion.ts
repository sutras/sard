// 启动惯性滑动的时间阈值
const momentumTimeThreshold = 300
// 启动惯性滑动的距离阈值
const momentumYThreshold = 15
// 惯性滑动加速度
const deceleration = 0.003
// 回弹阻力
const bounceRate = 10
// 强弱回弹的分割值
const bounceThreshold = 300
// 回弹的最大限度
const durationMap = {
  noBounce: 1000,
  weekBounce: 800,
  strongBounce: 400,
}
// 回弹时间
const resetDuration = 500
// 阻尼系数
const damping = 3

const bezierMap = {
  noBounce: 'cubic-bezier(.23,1,.68,1)',
  weekBounce: 'cubic-bezier(.25,.46,.45,.94)',
  strongBounce: 'cubic-bezier(.25,.46,.45,.94)',
  reset: 'cubic-bezier(.165, .84, .44, 1)',
}

export interface InertialMotionOptions {
  scrollHeight: number
  contentHeight: number
  onReset: (offsetY: number, duration: number, bezier: string) => void
  onStop: () => void
  onMove: (offsetY: number) => void
  onOutsideEnd: (offsetY: number) => void
  onInsideEnd: (offsetY: number) => void
  beforeMonmentum: (offsetY: number) => number
  onMomentum: (offsetY: number, duration: number, bezier: string) => void
  maxOverflowY?: number
}

export function createInertialMotion(options: InertialMotionOptions) {
  const {
    scrollHeight: _scrollHeight,
    contentHeight: _contentHeight,
    onReset,
    onStop,
    onMove: _onMove,
    onOutsideEnd,
    onInsideEnd,
    beforeMonmentum,
    onMomentum,
    maxOverflowY = 0,
  } = options

  let scrollHeight = _scrollHeight
  let contentHeight = _contentHeight

  let startClientY = 0
  let currentOffsetY = 0
  let startOffsetY = 0
  let momentumStartY = 0
  let startTime = 0
  let minY = scrollHeight - contentHeight
  const maxY = 0

  function setSize(scrollH: number, contentH: number) {
    scrollHeight = scrollH
    contentHeight = contentH
    minY = scrollHeight - contentHeight
  }

  let timer: NodeJS.Timeout | null
  function momentumEnd(duration) {
    timer = setTimeout(() => {
      timer = null
      isNeedReset()
    }, duration)
  }

  function stop() {
    if (timer) {
      clearTimeout(timer)
    }
    onStop()
  }

  function destroy() {
    if (timer) {
      clearTimeout(timer)
    }
  }

  function onStart(clientY: number) {
    stop()
    startClientY = clientY
    momentumStartY = startOffsetY = currentOffsetY
    startTime = Date.now()
  }

  function onMove(clientY: number) {
    const deltaY = clientY - startClientY
    let offsetY = Math.round(startOffsetY + deltaY)

    if (offsetY < minY) {
      offsetY = Math.round(minY + (offsetY - minY) / damping)
    } else if (offsetY > maxY) {
      offsetY = Math.round(offsetY / damping)
    }

    currentOffsetY = offsetY

    const now = Date.now()
    if (now - startTime > momentumTimeThreshold) {
      momentumStartY = currentOffsetY
      startTime = now
    }

    _onMove(currentOffsetY)
  }

  function onEnd() {
    const resetValue = isNeedReset()
    if (resetValue) {
      onOutsideEnd(currentOffsetY)
      return
    }

    const absDeltaY = Math.abs(currentOffsetY - momentumStartY)
    const duration = Date.now() - startTime
    if (duration < momentumTimeThreshold && absDeltaY > momentumYThreshold) {
      momentum(currentOffsetY, momentumStartY, duration)
    } else {
      onInsideEnd(currentOffsetY)
    }
  }

  function isNeedReset() {
    const offsetY = Math.min(Math.max(minY, currentOffsetY), maxY)
    if (offsetY !== currentOffsetY) {
      currentOffsetY = offsetY
      onReset(offsetY, resetDuration, bezierMap.reset)
      return true
    }
  }

  function momentum(current: number, start: number, duration: number) {
    const offset = current - start
    const speed = (2 * Math.abs(offset)) / duration
    const direction = offset < 0 ? -1 : 1
    const distance = (speed / deceleration) * direction
    let destination = current + distance

    let type = 'noBounce'
    let overflowY
    if (destination < minY) {
      overflowY = minY - destination
      type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
      destination = Math.max(minY - maxOverflowY, minY - overflowY / bounceRate)
    } else if (destination > maxY) {
      overflowY = destination - maxY
      type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
      destination = Math.min(maxY + maxOverflowY, maxY + overflowY / bounceRate)
    }

    destination = beforeMonmentum(destination)
    currentOffsetY = destination
    onMomentum(destination, durationMap[type], bezierMap[type])
    momentumEnd(durationMap[type])
  }

  function setCurrentOffsetY(offsetY: number) {
    currentOffsetY = offsetY
  }

  return {
    onStart,
    onMove,
    onEnd,
    setCurrentOffsetY,
    setSize,
    destroy,
  }
}
