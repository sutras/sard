import { FC } from 'react'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { getAngle360, isNullish } from '../utils'

export interface LinearGradientPoint {
  x: number
  y: number
}

export interface LinearGradientProps extends BaseProps {
  colors?: string[]
  start?: LinearGradientPoint
  end?: LinearGradientPoint
  locations?: number[]
}

export const LinearGradient: FC<LinearGradientProps> = (props) => {
  const {
    className,
    style,
    children,

    colors = [],
    start = {
      x: 0.5,
      y: 0,
    },
    end = {
      x: 0.5,
      y: 1,
    },
    locations = [],
    ...restProps
  } = props

  const getAngle = () => {
    return getAngle360(start, end)
  }

  const getColors = () => {
    return colors
      .map((color, index) => {
        const location = locations[index]

        return isNullish(location)
          ? color
          : [color, location * 100 + '%'].join(' ')
      })
      .join(',')
  }

  return (
    <View
      {...restProps}
      className={className}
      style={{
        ...style,
        backgroundImage: `linear-gradient(${getAngle()}deg, ${getColors()})`,
      }}
    >
      {children}
    </View>
  )
}

export default LinearGradient
