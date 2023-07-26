import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'

export interface ProgressBarProps extends BaseProps {
  percent?: number
  color?: string
  trackColor?: string
  striped?: boolean
  animated?: boolean
  thickness?: string | number
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    striped,
    animated,
    thickness,
    ...restProps
  } = props

  const progressClass = classNames(
    'sar-progress-bar',
    {
      'sar-progress-bar-striped': striped,
      'sar-progress-bar-animated': animated,
    },
    className,
  )
  const progressStyle = {
    backgroundColor: trackColor,
    height: thickness,
    ...style,
  }
  const trailClass = classNames('sar-progress-bar-trail')
  const trailStyle = {
    width: `${percent}%`,
    backgroundColor: color,
  }

  return (
    <View {...restProps} className={progressClass} style={progressStyle}>
      <View className={trailClass} style={trailStyle}>
        {children}
      </View>
    </View>
  )
}

export default ProgressBar
