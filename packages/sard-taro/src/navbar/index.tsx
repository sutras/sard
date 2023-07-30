import { FC, ReactNode } from 'react'
import classNames from 'classnames'

import { NavbarItem } from './Item'
import { BaseProps } from '../base'
import { View } from '@tarojs/components'
import { useBem } from '../use'

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

  const [bem] = useBem('navbar')

  const navbarClass = classNames(bem.b(), bem.m('fixed', fixed), className)

  const navbarStyle = {
    zIndex: fixed ? zIndex : '',
    ...style,
  }

  return (
    <View {...restProps} className={navbarClass} style={navbarStyle}>
      {left && (
        <View
          className={classNames(bem.e('left'), bem.em('left', 'flow', flow))}
        >
          {left}
        </View>
      )}
      <View className={bem.e('content')}>
        {children ?? (
          <View
            className={classNames(
              bem.e('title'),
              bem.em('title', 'flow', flow),
            )}
          >
            {title}
          </View>
        )}
      </View>
      {right && (
        <View
          className={classNames(bem.e('right'), bem.em('right', 'flow', flow))}
        >
          {right}
        </View>
      )}
    </View>
  )
}

Navbar.Item = NavbarItem

export default Navbar
