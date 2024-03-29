import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish, minmax } from '../utils'

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

  const finalPercent = minmax(percent, 0, 100)

  const radius = size / 2 - thickness / 2
  const angle = (percent / 100) * 360
  const radian = (angle / 180) * Math.PI
  const shrink = 0

  const renderHalf = (side: 'left' | 'right', style: Record<string, any>) => {
    return (
      <View className={bem.e(side)}>
        <View
          className={classNames(bem.e('trail'), bem.em('trail', side))}
          style={{
            width: size - shrink * 2,
            height: size - shrink * 2,
            margin: shrink,
            borderWidth: thickness - shrink * 2,
            ...filterNullish({
              borderColor: color,
            }),
          }}
        />
        <View
          className={classNames(
            bem.e('track-container'),
            bem.em('track-container', side),
          )}
          style={style}
        >
          <View
            className={classNames(
              bem.e('track-wrapper'),
              bem.em('track-wrapper', side),
            )}
          >
            <View
              className={classNames(bem.e('track'), bem.em('track', side))}
              style={filterNullish({
                borderWidth: thickness,
                ...filterNullish({
                  borderColor: trackColor,
                }),
              })}
            />
          </View>
        </View>
      </View>
    )
  }

  const renderCap = (side: 'start' | 'end', style: Record<string, any>) => {
    return (
      <View
        className={classNames(bem.e('cap'), bem.em('cap', side))}
        style={{
          width: thickness - shrink * 2,
          height: thickness - shrink * 2,
          backgroundColor: color,
          ...style,
        }}
      />
    )
  }

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
      {renderHalf('left', {
        transform: `rotate(${
          -180 + (finalPercent > 50 ? (180 / 50) * (finalPercent - 50) : 0)
        }deg)`,
      })}

      {renderHalf('right', {
        transform: `rotate(${
          -180 + (360 / 100) * (finalPercent <= 50 ? finalPercent : 50)
        }deg)`,
      })}

      {renderCap('start', {
        transform: `translate(${-thickness / 2}px, ${shrink}px)`,
      })}

      {renderCap('end', {
        left: radius + thickness / 2 + Math.sin(radian) * radius,
        top: radius + thickness / 2 - Math.cos(radian) * radius,
        transform: `translate(${-thickness / 2 + shrink}px, ${
          -thickness / 2 + shrink
        }px)`,
      })}

      {children}
    </View>
  )
}

export default ProgressCircle
