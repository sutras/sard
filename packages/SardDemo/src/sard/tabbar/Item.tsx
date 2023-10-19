import { memo, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish, isFunction } from '../utils'

export interface TabbarItemProps extends BaseProps {
  icon?: ReactNode | ((active: boolean) => ReactNode)
  iconProps?: IconProps | ((active: boolean) => IconProps)
  color?: string
  activeColor?: string
  badge?: BadgeProps
  onClick?: (event: ITouchEvent) => void
  _innerKey?: number | string
  _activeKey?: number | string
}

export const TabbarItem = memo((props: TabbarItemProps) => {
  const {
    className,
    style,
    children,

    icon,
    iconProps,
    color,
    activeColor,
    badge,
    onClick,
    _innerKey,
    _activeKey,
    ...restProps
  } = props

  const [bem] = useBem('tabbar')

  const active = _innerKey === _activeKey

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('item'),
        bem.em('item', 'active', active),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          color: active ? activeColor : color,
        }),
      }}
      onClick={onClick}
    >
      <View className={classNames(bem.e('icon-wrapper'))}>
        {isFunction(icon) ? (
          icon(active)
        ) : (
          <Icon
            {...(isFunction(iconProps) ? iconProps(active) : iconProps)}
            className={classNames(
              bem.e('icon'),
              bem.em('icon', 'active', active),
            )}
            style={filterNullish({
              color: active ? activeColor : color,
            })}
          />
        )}
        {badge && <Badge {...badge} fixed />}
      </View>
      <View
        className={classNames(bem.e('text'), bem.em('text', 'active', active))}
        style={filterNullish({
          color: active ? activeColor : color,
        })}
      >
        {children}
      </View>
    </View>
  )
})

export default TabbarItem
