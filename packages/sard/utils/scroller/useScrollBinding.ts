import { useInitialVelocity } from '../../use'

export function useScrollBinding(
  onTouchStart: () => void,
  onTouchMove: (deltaX: number, deltaY: number) => void,
  onTouchEnd: (
    deltaX: number,
    deltaY: number,
    v: { x: number; y: number },
    event: TouchEvent,
  ) => void,
) {
  const initVelocity = useInitialVelocity()

  let startX = 0
  let startY = 0
  let deltaX = 0
  let deltaY = 0

  /**
   * 处理手势开始，初始化位置与历史数据。
   */
  function handleTouchStart(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault()
    }

    const { clientX, clientY } = event.touches[0]
    startX = clientX
    startY = clientY
    deltaX = 0
    deltaY = 0

    initVelocity.start(clientX, clientY)

    onTouchStart()
  }

  /**
   * 处理手势移动，并将速度数据累积到历史记录中。
   */
  function handleTouchMove(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault()
    }

    const { clientX, clientY } = event.touches[0]

    deltaX = clientX - startX
    deltaY = clientY - startY

    initVelocity.move(clientX, clientY)

    onTouchMove(deltaX, deltaY)
  }

  /**
   * 处理手势结束，并根据历史速度计算惯性滚动速度。
   */
  function handleTouchEnd(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault()
    }

    const { x, y } = initVelocity.end()

    onTouchEnd(deltaX, deltaY, { x: x * 1000, y: y * 1000 }, event)
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
