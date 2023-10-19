import { FC, ReactElement, useMemo } from 'react'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { createHandlers } from './usePan'

export interface PanGestureDetectorProps {
  children?: ReactElement
  handlers: ReturnType<typeof createHandlers>
}

export const PanGestureDetector: FC<PanGestureDetectorProps> = (props) => {
  const { children, handlers } = props

  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onTouchesDown((event) => {
        handlers.onTouchStart(event)
      })
      .onTouchesMove((event) => {
        handlers.onTouchMove(event)
      })
      .onTouchesUp((event) => {
        handlers.onTouchEnd(event)
      })
      .onTouchesCancelled((event) => {
        handlers.onTouchCancel(event)
      })
  }, [])

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>
}

export default PanGestureDetector
