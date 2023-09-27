import { FC, useMemo, useRef } from 'react'
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native'
import { Transition, TransitionProps, Timeouts, getTimeouts } from './index'
import { useEvent, useSetTimeout } from '../use'
import { isFunction } from '../utils'

export interface CSSTransitionProps extends TransitionProps {
  effect?:
    | 'fade'
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
}

const createAnimStrategies = {
  fade: (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)

    return {
      enter() {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: timeouts.enter,
          useNativeDriver: true,
        }).start()
      },
      exit() {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: timeouts.exit,
          useNativeDriver: true,
        }).start()
      },
      style: {
        opacity: opacityValue,
      },
    }
  },

  zoom: (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)
    const scaleValue = new Animated.Value(0.7)

    return {
      enter() {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      exit() {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 0.9,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      style: {
        opacity: opacityValue,
        transform: [{ scale: scaleValue }],
      },
    }
  },

  'slide-top': (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)
    const yValue = new Animated.Value(0)

    return {
      enter(rect: LayoutRectangle) {
        yValue.setValue(-rect.height)

        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: timeouts.enter / 3,
              useNativeDriver: true,
            }),
            Animated.timing(yValue, {
              toValue: 0,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      exit(rect: LayoutRectangle) {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
            Animated.timing(yValue, {
              toValue: -rect.height,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      style: {
        opacity: opacityValue,
        transform: [{ translateY: yValue }],
      },
    }
  },

  'slide-right': (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)
    const xValue = new Animated.Value(0)

    return {
      enter(rect: LayoutRectangle) {
        xValue.setValue(rect.width)

        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: timeouts.enter / 3,
              useNativeDriver: true,
            }),
            Animated.timing(xValue, {
              toValue: 0,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      exit(rect: LayoutRectangle) {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
            Animated.timing(xValue, {
              toValue: rect.width,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      style: {
        opacity: opacityValue,
        transform: [{ translateX: xValue }],
      },
    }
  },

  'slide-bottom': (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)
    const yValue = new Animated.Value(0)

    return {
      enter(rect: LayoutRectangle) {
        yValue.setValue(rect.height)

        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: timeouts.enter / 3,
              useNativeDriver: true,
            }),
            Animated.timing(yValue, {
              toValue: 0,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      exit(rect: LayoutRectangle) {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
            Animated.timing(yValue, {
              toValue: rect.height,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      style: {
        opacity: opacityValue,
        transform: [{ translateY: yValue }],
      },
    }
  },

  'slide-left': (timeouts: Timeouts) => {
    const opacityValue = new Animated.Value(0)
    const xValue = new Animated.Value(0)

    return {
      enter(rect: LayoutRectangle) {
        xValue.setValue(-rect.width)

        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: timeouts.enter / 3,
              useNativeDriver: true,
            }),
            Animated.timing(xValue, {
              toValue: 0,
              duration: timeouts.enter,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      exit(rect: LayoutRectangle) {
        Animated.parallel(
          [
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
            Animated.timing(xValue, {
              toValue: -rect.width,
              duration: timeouts.exit,
              useNativeDriver: true,
            }),
          ],
          {
            stopTogether: false,
          },
        ).start()
      },
      style: {
        opacity: opacityValue,
        transform: [{ translateX: xValue }],
      },
    }
  },
}

export const CSSTransition: FC<CSSTransitionProps> = (props) => {
  const {
    children,
    effect,
    timeout = 300,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const timeouts = useMemo(() => {
    return getTimeouts(timeout)
  }, [timeout])

  const anim = useMemo(() => {
    if (!effect) {
      return null
    }
    return createAnimStrategies[effect](timeouts)
  }, [effect, timeouts])

  const currentLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const handleLayout = useEvent((event: LayoutChangeEvent) => {
    currentLayout.current = event.nativeEvent.layout
  })

  const [startEnterLater] = useSetTimeout(() => {
    startEnter()
  }, 0)

  const startEnter = useEvent(() => {
    if (!anim) {
      return
    }
    if (currentLayout.current.width > 0 || currentLayout.current.height > 0) {
      anim.enter(currentLayout.current)
    } else {
      startEnterLater()
    }
  })

  const startExit = useEvent(() => {
    if (!anim) {
      return
    }
    anim.exit(currentLayout.current)
  })

  const handleEnter = () => {
    onEnter?.()
  }

  const handleEntering = () => {
    onEntering?.()
    startEnter()
  }

  const handleEntered = () => {
    onEntered?.()
  }

  const handleExit = () => {
    onExit?.()
    startExit()
  }

  const handleExiting = () => {
    onExiting?.()
  }

  const handleExited = () => {
    // tips: setTimeout 可以解决隐藏后闪烁一下的问题
    setTimeout(() => {
      onExited?.()
    })
  }

  return (
    <Transition
      {...restProps}
      timeout={timeout}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {(options, props) => {
        return (
          <Animated.View
            {...props}
            style={[props.style, anim?.style]}
            onLayout={handleLayout}
          >
            {isFunction(children) ? children(options, restProps) : children}
          </Animated.View>
        )
      }}
    </Transition>
  )
}

export default CSSTransition
