import { FC, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { addPxInWeb, filterNullish, isRN } from '../utils'
import { useBem } from '../use'
import Icon from '../icon'
import { Animated, Easing } from '../animated'

export interface LoadingProps extends BaseProps {
  name?: 'loading'
  size?: number
  color?: string
  duration?: number
}

export const Loading: FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    name = 'loading',
    color,
    size = 20,
    duration = 800,
    ...restProps
  } = props

  const [bem] = useBem('loading')

  // Animated >>>
  const anim = useMemo(() => new Animated.Value(0), [])

  const spin = useMemo(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  }, [])

  useEffect(
    () => () => {
      anim.stopAnimation()
    },
    [],
  )
  // <<< Animated

  return (
    <Icon
      _element={Animated.Text}
      {...restProps}
      name={name}
      className={classNames(bem.b(), className)}
      style={
        {
          ...style,
          width: size,
          height: size,
          ...filterNullish({
            fontSize: size,
            lineHeight: size ? addPxInWeb(size) : size,
            color,
          }),
          ...(isRN
            ? {
                transform: [{ rotate: spin }],
              }
            : {
                animationDuration: duration + 'ms',
              }),
        } as any
      }
    />
  )
}

export default Loading
