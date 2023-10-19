import { FC, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { Animated } from '../animated'
import { isRN } from '../utils'

export interface SkeletonBlockProps extends BaseProps {
  animated?: boolean
  round?: boolean
}

export const SkeletonBlock: FC<SkeletonBlockProps> = (props) => {
  const { className, style, animated, round, children, ...restProps } = props

  const [bem] = useBem('skeleton')

  // Animated >>>
  const anim = useMemo(() => new Animated.Value(1), [])

  const startAnimate = () => {
    const loopAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    )
    loopAnim.start()
    return loopAnim
  }

  useEffect(() => {
    let loopAnim

    if (animated) {
      loopAnim = startAnimate()
    }

    return () => {
      loopAnim?.stop()
      anim.stopAnimation()
    }
  }, [animated])
  // <<< Animated

  return (
    <Animated.View
      {...restProps}
      className={classNames(
        bem.e('block'),
        bem.m('animated', animated),
        bem.m('round', round),
        className,
      )}
      style={{
        ...style,
        ...(isRN ? ({ opacity: anim } as any) : null),
      }}
    >
      {children}
    </Animated.View>
  )
}

export default SkeletonBlock
