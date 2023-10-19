import { FC } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import { BaseProps } from '../base'
import { useBem } from '../use'

export interface ProgressCircleProps extends BaseProps {
  percent?: number
  color?: string
  trackColor?: string
  size?: number
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
    size = 100,
    thickness = 4,
    ...restProps
  } = props

  const [bem] = useBem('progress-circle')

  const radius = 50 - thickness / 2
  const angle = (percent / 100) * 360
  const radian = (angle / 180) * Math.PI

  const mask =
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e` +
    `%3ccircle stroke='black' fill='none' stroke-width='${thickness}' cx='50' cy='50' r='${radius}' /%3e%3c/svg%3e")`

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        width: size,
        height: size,
      }}
    >
      <View
        className={bem.e('outer')}
        style={
          {
            backgroundColor: trackColor,
            '-webkit-mask': mask,
            mask: mask,
          } as any
        }
      >
        <View
          className={bem.e('inner')}
          style={{
            color,
            backgroundImage: `conic-gradient(currentColor ${angle}deg, transparent 0)`,
          }}
        >
          <View
            className={classNames(bem.e('cap'), bem.e('cap-start'))}
            style={{
              width: thickness + '%',
              height: thickness + '%',
            }}
          />
          <View
            className={classNames(bem.e('cap'), bem.e('cap-end'))}
            style={{
              width: thickness + '%',
              height: thickness + '%',
              left: 50 + Math.sin(radian) * radius + '%',
              top: 50 - Math.cos(radian) * radius + '%',
            }}
          />
        </View>
      </View>
      {children}
    </View>
  )
}

export default ProgressCircle
