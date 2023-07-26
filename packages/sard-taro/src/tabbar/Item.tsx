import { memo, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'
import { BaseProps } from '../base'
import { ITouchEvent, View } from '@tarojs/components'

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

  const handleClick = (event: ITouchEvent) => {
    onClick?.(event)
  }

  const active = innerKey === activeKey

  const tabbarClass = classNames(
    'sar-tabbar-item',
    {
      'sar-tabbar-item-active': active,
    },
    className,
  )

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
      <View className="sar-tabbar-item-icon">
        {typeof icon === 'function' ? icon(active) : <Icon {...icon}></Icon>}
        {badge && <Badge {...badge} fixed></Badge>}
      </View>
      <View className="sar-tabbar-item-text">{children}</View>
    </View>
  )
})

export default TabbarItem
