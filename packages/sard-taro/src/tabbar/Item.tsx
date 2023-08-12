import { memo, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'
import { BaseProps } from '../base'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem } from '../use'
import { isFunction } from '../utils'

export interface TabbarItemProps extends BaseProps {
  activeKey?: number | string
  innerKey?: number | string
  icon?: IconProps | ((active: boolean) => ReactNode)
  color?: string
  activeColor?: string
  badge?: BadgeProps
  onClick?: (event: ITouchEvent) => void
}

export const TabbarItem = memo((props: TabbarItemProps) => {
  const {
    className,
    style,
    children,
    icon,
    innerKey,
    activeKey,
    color,
    activeColor,
    badge,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('tabbar-item')

  const handleClick = (event: ITouchEvent) => {
    onClick?.(event)
  }

  const active = innerKey === activeKey

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m('active', active), className)}
      style={{
        color: active ? activeColor : color,
        ...style,
      }}
      onClick={handleClick}
    >
      <View className={bem.e('icon')}>
        {isFunction(icon) ? icon(active) : <Icon {...icon}></Icon>}
        {badge && <Badge {...badge} fixed></Badge>}
      </View>
      <View className={bem.e('text')}>{children}</View>
    </View>
  )
})

export default TabbarItem
