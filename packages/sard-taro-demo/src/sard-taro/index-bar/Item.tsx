import { CSSProperties, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem } from '../use'
import { BaseProps } from '../base'

export interface IndexBarItemProps extends BaseProps {
  title?: ReactNode
  anchorClass?: string
  anchorStyle?: CSSProperties
}

export const IndexBarItem = forwardRef<any, IndexBarItemProps>((props, ref) => {
  const {
    className,
    style,
    children,
    title,
    anchorClass,
    anchorStyle,
    ...restProps
  } = props

  const [bem] = useBem('index-bar')

  return (
    <View
      {...restProps}
      ref={ref}
      className={classNames(bem.e('item'), className)}
      style={style}
    >
      <View
        className={classNames(bem.e('item-anchor'), anchorClass)}
        style={anchorStyle}
      >
        {title}
      </View>
      <View className={bem.e('item-content')}>{children}</View>
    </View>
  )
})

export default IndexBarItem
