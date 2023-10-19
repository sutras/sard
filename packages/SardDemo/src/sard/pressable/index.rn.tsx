import { FC, ReactElement, isValidElement, useMemo, useState } from 'react'
import { isFunction } from '../utils'
import { useEvent } from '../use'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

export interface PressableProps {
  disabled?: boolean
  children?: (state: { pressed: boolean }) => ReactElement
  onTouchStart?: (event: any) => void
  onTouchMove?: (event: any) => void
  onTouchEnd?: (event: any) => void
  onTouchCancel?: (event: any) => void
}

export const Pressable: FC<PressableProps> = (props) => {
  const {
    disabled,
    children,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  } = props

  const [pressed, setPressed] = useState(false)

  const handleTouchStart = useEvent((event) => {
    if (!disabled) {
      setPressed(true)
    }
    onTouchStart?.(event)
  })

  const handleTouchMove = useEvent((event) => {
    onTouchMove?.(event)
  })

  const handleTouchEnd = useEvent((event) => {
    setPressed(false)
    onTouchEnd?.(event)
  })

  const handleTouchCancel = useEvent((event) => {
    setPressed(false)
    onTouchCancel?.(event)
  })

  const gesture = useMemo(() => {
    return Gesture.Manual()
      .onTouchesDown((event) => {
        handleTouchStart(event)
      })
      .onTouchesMove((event) => {
        handleTouchMove(event)
      })
      .onTouchesUp((event) => {
        handleTouchEnd(event)
      })
      .onTouchesCancelled((event) => {
        handleTouchCancel(event)
      })
  }, [])

  if (!isFunction(children)) {
    return <>{children}</>
  }
  const element = children({ pressed })

  if (!isValidElement(element)) {
    return <>{element}</>
  }

  return <GestureDetector gesture={gesture}>{element}</GestureDetector>
}

export default Pressable
