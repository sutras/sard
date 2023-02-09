import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'

import { NavbarItem } from './Item'

export * from './Item'

export interface NavbarProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  prepend?: ReactNode
  append?: ReactNode
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
    prepend,
    append,
    flow,
    fixed,
    zIndex = 1,
    ...restProps
  } = props

  const navbarClass = classNames(
    's-navbar',
    {
      's-navbar-flow': flow,
      's-navbar-fixed': fixed,
    },
    className,
  )

  const navbarStyle = {
    zIndex: fixed ? zIndex : '',
    ...style,
  }

  return (
    <div {...restProps} className={navbarClass} style={navbarStyle}>
      {prepend && <div className="s-navbar-prepend">{prepend}</div>}
      <div className="s-navbar-content">
        {children || <div className="s-navbar-title">{title}</div>}
      </div>
      {append && <div className="s-navbar-append">{append}</div>}
    </div>
  )
}

Navbar.Item = NavbarItem

export default Navbar
