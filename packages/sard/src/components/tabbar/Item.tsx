import { CSSProperties, memo, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'

export interface TabbarItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  activeKey?: number | string
  innerKey?: number | string
  icon?: IconProps | ((active: boolean) => ReactNode)
  color?: string
  activeColor?: string
  badge?: BadgeProps
  onClick?: (event: MouseEvent) => void
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

  const handleClick = (event: MouseEvent) => {
    onClick?.(event)
  }

  const active = innerKey === activeKey

  const tabbarClass = classNames(
    's-tabbar-item',
    {
      's-tabbar-item-active': active,
    },
    className,
  )

  const tabbarItemStyle = {
    color: active ? activeColor : color,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={tabbarClass}
      style={tabbarItemStyle}
      onClick={handleClick}
    >
      <div className="s-tabbar-item-icon">
        {typeof icon === 'function' ? icon(active) : <Icon {...icon}></Icon>}
        {badge && <Badge {...badge} fixed></Badge>}
      </div>
      <div className="s-tabbar-item-text">{children}</div>
    </div>
  )
})

export default TabbarItem
