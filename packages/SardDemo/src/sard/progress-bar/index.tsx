import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export interface ProgressBarProps extends BaseProps {
  percent?: number
  color?: string
  trackColor?: string
  thickness?: number
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    thickness,
    ...restProps
  } = props

  const [bem] = useBem('progress-bar')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        ...filterNullish({
          backgroundColor: trackColor,
          height: thickness,
        }),
      }}
    >
      <View
        className={bem.e('trail')}
        style={{
          width: `${percent}%`,
          ...filterNullish({
            backgroundColor: color,
          }),
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default ProgressBar
