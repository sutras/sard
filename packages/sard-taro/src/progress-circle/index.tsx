import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { useBem } from '../use'

export interface ProgressCircleProps extends BaseProps {
  percent?: number
  color?: string
  trackColor?: string
  size?: string
  thickness?: number
}

export const ProgressCircle: FC<ProgressCircleProps> = (props) => {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    size = '100px',
    thickness = 4,
    ...restProps
  } = props

  const [bem] = useBem('progress-circle')

  const radius = 50 - thickness / 2
  const angle = (percent / 100) * 360
  const radian = (angle / 180) * Math.PI

  const progressClass = classNames(bem.b(), className)
  const progressStyle = {
    width: size,
    height: size,
    ...style,
  }

  const mask =
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e` +
    `%3ccircle stroke='black' fill='none' stroke-width='${thickness}' cx='50' cy='50' r='${radius}' /%3e%3c/svg%3e")`

  const trackStyle = {
    backgroundColor: trackColor,
    '-webkit-mask': mask,
    WebkitMask: mask,
    mask: mask,
  }

  const trailStyle = {
    color,
    backgroundImage: `conic-gradient(currentColor ${angle}deg, transparent 0)`,
  }

  const capStartStyle = {
    width: thickness + '%',
    height: thickness + '%',
  }

  const capEndStyle = {
    width: thickness + '%',
    height: thickness + '%',
    left: 50 + Math.sin(radian) * radius + '%',
    top: 50 - Math.cos(radian) * radius + '%',
  }

  return (
    <View {...restProps} className={progressClass} style={progressStyle}>
      <View className={bem.e('track')} style={trackStyle}>
        <View className={bem.e('trail')} style={trailStyle}>
          <View
            className={classNames(
              bem.e('cap'),
              bem.e('cap-start'),
              bem.em('cap', 'percent-zero', percent <= 0),
            )}
            style={capStartStyle}
          ></View>
          <View
            className={classNames(
              bem.e('cap'),
              bem.e('cap-end'),
              bem.em('cap', 'percent-zero', percent <= 0),
            )}
            style={capEndStyle}
          ></View>
        </View>
      </View>
      {children}
    </View>
  )
}

export default ProgressCircle
