import { FC, ReactNode } from 'react'
import classNames from 'classnames'

import { NavbarItem } from './Item'
import { BaseProps } from '../base'
import { View } from '@tarojs/components'

export * from './Item'

export interface NavbarProps extends BaseProps {
  title?: ReactNode
  left?: ReactNode
  right?: ReactNode
  flow?: boolean
  fixed?: boolean
  zIndex?: string | number
}

export interface NavbarFC extends FC<NavbarProps> {
  Item: typeof NavbarItem
}

export const Navbar: NavbarFC = (props) => {
  const {
    className,
    style,
    children,
    title,
    left,
    right,
    flow,
    fixed,
    zIndex = 1,
    ...restProps
  } = props

  const navbarClass = classNames(
    'sar-navbar',
    {
      'sar-navbar-flow': flow,
      'sar-navbar-fixed': fixed,
    },
    className,
  )

  const navbarStyle = {
    zIndex: fixed ? zIndex : '',
    ...style,
  }

  return (
    <View {...restProps} className={navbarClass} style={navbarStyle}>
      {left && <View className="sar-navbar-left">{left}</View>}
      <View className="sar-navbar-content">
        {children ?? <View className="sar-navbar-title">{title}</View>}
      </View>
      {right && <View className="sar-navbar-right">{right}</View>}
    </View>
  )
}

Navbar.Item = NavbarItem

export default Navbar
