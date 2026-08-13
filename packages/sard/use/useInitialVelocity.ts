const VELOCITY_WINDOW_MS = 100

export function useInitialVelocity() {
  const samples: { x: number; y: number; time: number }[] = []
  let lastPoint: { x: number; y: number } | null = null

  /**
   * 开始记录（pointerdown 时调用）。
   *
   * @param point 当前触摸点的绝对坐标
   */
  function start(x: number, y: number) {
    lastPoint = { x, y }
    samples.length = 0
  }

  /**
   * 记录一次位移（pointermove 时调用）。
   *
   * 内部自动计算与上一次位置的增量。
   *
   * @param point 当前触摸点的绝对坐标
   */
  function move(x: number, y: number) {
    if (!lastPoint) return

    const now = Date.now()
    const deltaX = x - lastPoint.x
    const deltaY = y - lastPoint.y

    lastPoint = { x, y }

    samples.push({ x: deltaX, y: deltaY, time: now })

    // 只保留最近 100ms 的采样，防止长时间拖拽导致数组膨胀
    const cutoff = now - VELOCITY_WINDOW_MS
    while (samples.length && samples[0].time < cutoff) {
      samples.shift()
    }
  }

  /**
   * 估算手指释放瞬间的速度（pointerup 时调用）。
   *
   * 基于最近 100ms 内的总位移 / 总时间。
   *
   * @returns 速度对象 { x, y }，单位 px/ms。采样不足时返回 { x: 0, y: 0 }。
   */
  function end(): { x: number; y: number } {
    if (samples.length < 2) {
      samples.length = 0
      lastPoint = null
      return { x: 0, y: 0 }
    }

    const now = Date.now()
    const cutoff = now - VELOCITY_WINDOW_MS

    let start = 0
    while (start < samples.length && samples[start].time < cutoff) {
      start++
    }

    const windowSamples = samples.slice(start)
    samples.length = 0
    lastPoint = null

    if (windowSamples.length < 2) return { x: 0, y: 0 }

    const first = windowSamples[0]
    const last = windowSamples[windowSamples.length - 1]
    const totalTime = last.time - first.time

    let totalX = 0
    let totalY = 0
    for (const s of windowSamples) {
      totalX += s.x
      totalY += s.y
    }

    return {
      x: totalTime > 0 ? totalX / totalTime : 0,
      y: totalTime > 0 ? totalY / totalTime : 0,
    }
  }

  return { start, move, end }
}
