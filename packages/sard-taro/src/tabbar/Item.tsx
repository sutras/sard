import { memo, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'
import { BaseProps } from '../base'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem } from '../use'

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

  const tabbarClass = classNames(bem.b(), bem.m('active', active), className)

  const tabbarItemStyle = {
    color: active ? activeColor : color,
    ...style,
  }

  return (
    <View
      {...restProps}
      className={tabbarClass}
      style={tabbarItemStyle}
      onClick={handleClick}
    >
      <View className={bem.e('icon')}>
        {typeof icon === 'function' ? icon(active) : <Icon {...icon}></Icon>}
        {badge && <Badge {...badge} fixed></Badge>}
      </View>
      <View className={bem.e('text')}>{children}</View>
    </View>
  )
})

export default TabbarItem
