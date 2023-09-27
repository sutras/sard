import {
  FC,
  ReactElement,
  cloneElement,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useEvent } from '../use'
import { isFunction, isPC, createMouseBinder } from '../utils'

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

  const handleTouchStart = useEvent(() => {
    if (!disabled) {
      setPressed(true)
    }
  })

  const handleTouchEnd = useEvent(() => {
    setPressed(false)
  })

  const elementRef = useRef<ReactElement>()

  const mouseBinder = useMemo(() => {
    return isPC()
      ? createMouseBinder({
          onStart(event) {
            handleTouchStart()
            elementRef.current?.props.onMouseDown?.(event)
          },
          onEnd() {
            handleTouchEnd()
          },
        })
      : null
  }, [])

  if (!isFunction(children)) {
    return <>{children}</>
  }
  elementRef.current = children({ pressed })

  return cloneElement(elementRef.current, {
    onTouchStart(event) {
      handleTouchStart()
      onTouchStart?.(event)
    },
    onTouchMove(event) {
      onTouchMove?.(event)
    },
    onTouchEnd(event) {
      handleTouchEnd()
      onTouchEnd?.(event)
    },
    onTouchCancel(event) {
      handleTouchEnd()
      onTouchCancel?.(event)
    },
    ...mouseBinder,
  })
}

export default Pressable
