import { CSSProperties, FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem } from '../use'

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

  const [bem] = useBem('loading')

  const clockIcon = useMemo(() => {
    return Array(12)
      .fill(0)
      .map((_, i) => (
        <View
          key={i}
          className={classNames(bem.e('scale'), bem.em('scale', i + 1))}
        ></View>
      ))
  }, [bem])

  const circularIcon = useMemo(() => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <View
          key={i}
          className={classNames(
            bem.e('circular-item'),
            bem.em('circular-item', i + 1),
          )}
        ></View>
      ))
  }, [bem])

  const renderIcon = () => {
    return (
      <View
        className={classNames(bem.e('icon'), bem.e(type), iconClass)}
        style={{
          color,
          width: size,
          height: size,
          fontSize: size,
          ...iconStyle,
        }}
      >
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
          className={classNames(
            bem.e('text'),
            bem.em('text', 'vertical', vertical),
          )}
          style={{ color: textColor, fontSize: textSize }}
        >
          {children ?? text}
        </View>
      )
    )
  }

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m('vertical', vertical), className)}
    >
      {renderIcon()}
      {renderText()}
    </View>
  )
}

export default Loading
