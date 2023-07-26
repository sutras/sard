import { FC, ReactNode } from 'react'
import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'

import { AvatarGroup } from './Group'
import { BaseProps } from '../base'

export * from './Group'

export interface AvatarProps extends BaseProps {
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

  const avatarClass = classNames('sar-avatar', 'sar-avatar-' + shape, className)

  const avatarStyle = {
    width: size,
    height: size,
    fontSize: iconSize,
    ...style,
  }

  return (
    <View {...restProps} className={avatarClass} style={avatarStyle}>
      {children ??
        (src ? (
          <Image src={src} className="sar-avatar-image" />
        ) : (
          <Icon name="person" {...iconProps}></Icon>
        ))}
      {extra}
    </View>
  )
}

Avatar.Group = AvatarGroup

export default Avatar
