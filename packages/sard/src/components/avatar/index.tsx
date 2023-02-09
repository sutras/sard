import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'

import { AvatarGroup } from './Group'

export * from './Group'

export interface AvatarProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  shape?: 'circle' | 'square'
  size?: number | string
  iconSize?: number | string
  src?: string
  iconProps?: IconProps
  extra?: ReactNode
}

export interface AvatarFC extends FC<AvatarProps> {
  Group: typeof AvatarGroup
}

export const Avatar: AvatarFC = (props) => {
  const {
    className,
    style,
    children,
    shape = 'circle',
    size,
    iconSize,
    src,
    iconProps,
    extra,
    ...restProps
  } = props

  const avatarClass = classNames('s-avatar', 's-avatar-' + shape, className)

  const avatarStyle = {
    width: size,
    height: size,
    fontSize: iconSize,
    ...style,
  }

  return (
    <div {...restProps} className={avatarClass} style={avatarStyle}>
      {children ||
        (src ? (
          <img src={src} className="s-avatar-img" />
        ) : (
          <Icon prefix="si" name="person"></Icon>
        ))}
      {extra}
    </div>
  )
}

Avatar.Group = AvatarGroup

export default Avatar
