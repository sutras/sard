import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'

export interface NavbarItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
  const { className, children, ...restProps } = props

  const itemClass = classNames('s-navbar-item', className)

  return (
    <div {...restProps} className={itemClass}>
      {children}
    </div>
  )
}

export default NavbarItem
