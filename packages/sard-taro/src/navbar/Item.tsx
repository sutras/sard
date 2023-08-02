import { FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface NavbarItemProps extends BaseProps {
  onClick?: (event: ITouchEvent) => void
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
  const { className, children, ...restProps } = props

  const [bem] = useBem('navbar')

  return (
    <View {...restProps} className={classNames(bem.e('item'), className)}>
      {children}
    </View>
  )
}

export default NavbarItem
