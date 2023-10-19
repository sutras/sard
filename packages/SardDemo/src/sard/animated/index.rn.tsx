import { forwardRef, useMemo, useRef } from 'react'
import { Animated, Easing, PanResponder, ViewProps } from 'react-native'

const AnimatedView = Animated.View

const _Animated = { ...Animated }

const maxDistance = 10
const maxDuration = 800

_Animated.View = forwardRef(
  (
    props: ViewProps & {
      onClick?: (event: any) => void
    },
    ref,
  ) => {
    const { onClick, ...restProps } = props

    const downTimestamp = useRef(0)

    const panResponder = useMemo(() => {
      return onClick
        ? PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
              downTimestamp.current = Date.now()
            },
            onPanResponderRelease: (evt, gestureState) => {
              const { dx, dy } = gestureState
              const timestamp = Date.now()
              if (
                Math.abs(dx) < maxDistance &&
                Math.abs(dy) < maxDistance &&
                timestamp - downTimestamp.current < maxDuration
              ) {
                onClick?.(evt)
              }
            },
          })
        : {
            panHandlers: null,
          }
    }, [onClick])

    return (
      <AnimatedView {...restProps} {...panResponder.panHandlers} ref={ref} />
    )
  },
) as typeof AnimatedView

export { _Animated as Animated, Easing }

export default _Animated
