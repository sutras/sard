import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export interface LoadingProps extends BaseProps {
  type?: 'clock' | 'circular'
  color?: string
  size?: string | number
  text?: ReactNode
  textColor?: string
  textSize?: string | number
  vertical?: boolean
  iconStyle?: CSSProperties
  iconClass?: string
}

const clockIcon = Array(12)
  .fill(0)
  .map((_, i) => <View key={i} className="sar-loading-scale"></View>)

const circularIcon = Array(3)
  .fill(0)
  .map((_, i) => <View key={i} className="sar-loading-circular-item"></View>)

export const Loading: FC<LoadingProps> = (props) => {
  const {
    className,
    children,
    type = 'circular',
    color,
    size,
    text,
    textColor,
    textSize,
    vertical = false,
    iconStyle,
    iconClass,
    ...restProps
  } = props

  const loadingClass = classNames(
    'sar-loading',
    {
      'sar-loading-vertical': vertical,
    },
    className,
  )

  const innerIconClass = classNames(
    'sar-loading-icon',
    'sar-loading-' + type,
    iconClass,
  )
  const innerIconStyle = {
    color,
    width: size,
    height: size,
    fontSize: size,
    ...iconStyle,
  }

  const renderIcon = () => {
    return (
      <View className={innerIconClass} style={innerIconStyle}>
        {type === 'circular'
          ? circularIcon
          : type === 'clock'
          ? clockIcon
          : null}
      </View>
    )
  }

  const renderText = () => {
    return (
      (!isNullish(children) || !isNullish(text)) && (
        <View
          className="sar-loading-text"
          style={{ color: textColor, fontSize: textSize }}
        >
          {children ?? text}
        </View>
      )
    )
  }

  return (
    <View {...restProps} className={loadingClass}>
      {renderIcon()}
      {renderText()}
    </View>
  )
}

export default Loading
