import { FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'

export interface NavbarItemProps extends BaseProps {
  onClick?: (event: ITouchEvent) => void
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
  const { className, children, ...restProps } = props

  const itemClass = classNames('sar-navbar-item', className)

  return (
    <View {...restProps} className={itemClass}>
      {children}
    </View>
  )
}

export default NavbarItem
