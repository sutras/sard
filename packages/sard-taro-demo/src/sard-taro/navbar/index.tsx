import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import { NavbarItem } from './Item'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Halfline from '../halfline'
import Ellipsis from '../ellipsis'
import { isNullish } from '../utils'

export * from './Item'

export interface NavbarProps extends BaseProps {
  title?: ReactNode
  left?: ReactNode
  right?: ReactNode
  flow?: boolean
}

export interface NavbarFC extends FC<NavbarProps> {
  Item: typeof NavbarItem
}

export const Navbar: NavbarFC = (props) => {
  const { className, style, children, title, left, right, flow, ...restProps } =
    props

  const [bem] = useBem('navbar')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      {left && (
        <View
          className={classNames(bem.e('left'), bem.em('left', 'flow', flow))}
        >
          {left}
        </View>
      )}
      <View
        className={classNames(
          bem.e('content'),
          bem.em('content', 'custom', !isNullish(children)),
        )}
      >
        {children ?? (
          <Ellipsis
            className={classNames(
              bem.e('title'),
              bem.em('title', 'flow', flow),
            )}
          >
            {title}
          </Ellipsis>
        )}
      </View>
      {right && (
        <View
          className={classNames(bem.e('right'), bem.em('right', 'flow', flow))}
        >
          {right}
        </View>
      )}

      <Halfline direction="bottom" />
    </View>
  )
}

Navbar.Item = NavbarItem

export default Navbar
