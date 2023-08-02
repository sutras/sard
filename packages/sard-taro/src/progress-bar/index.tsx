import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

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

  const [bem] = useBem('progress-bar')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        backgroundColor: trackColor,
        height: thickness,
        ...style,
      }}
    >
      <View
        className={classNames(
          bem.e('trail'),
          bem.em('trail', 'striped', striped),
          bem.em('trail', 'animated', animated),
        )}
        style={{
          width: `${percent}%`,
          backgroundColor: color,
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default ProgressBar
