import { CSSProperties, FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { isNullish } from '../utils'
import Halfline from '../halfline'

export interface CardProps extends BaseProps {
  title?: ReactNode
  extra?: ReactNode
  footer?: ReactNode
  headerStyle?: CSSProperties
  headerClass?: string
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}

export const Card: FC<CardProps> = (props) => {
  const {
    className,
    style,
    children,

    title,
    extra,
    footer,
    headerStyle,
    headerClass,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    ...restProps
  } = props

  const [bem] = useBem('card')

  const headless = isNullish(title) && isNullish(extra)
  const footless = isNullish(footer)

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      {!headless && (
        <View
          className={classNames(bem.e('header'), headerClass)}
          style={headerStyle}
        >
          <View className={classNames(bem.e('title'))}>{title}</View>
          <View className={classNames(bem.e('extra'))}>{extra}</View>
          <Halfline direction="bottom" />
        </View>
      )}
      <View
        className={classNames(
          bem.e('body'),
          bem.em('body', 'headless', headless),
          bem.em('body', 'footless', footless),
          bodyClass,
        )}
        style={bodyStyle}
      >
        {children}
      </View>
      {!footless && (
        <View
          className={classNames(bem.e('footer'), footerClass)}
          style={footerStyle}
        >
          <Halfline direction="top" />
          {footer}
        </View>
      )}
    </View>
  )
}

export default Card
