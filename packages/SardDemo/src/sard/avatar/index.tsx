import { FC, ReactNode } from 'react'
import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'

import { AvatarGroup } from './Group'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export * from './Group'

export interface AvatarProps extends BaseProps {
  shape?: 'circle' | 'square'
  size?: number
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
    src,
    iconProps,
    extra,
    ...restProps
  } = props

  const [bem] = useBem('avatar')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(shape), className)}
      style={{
        ...style,
        ...filterNullish({
          width: size,
          height: size,
        }),
      }}
    >
      {children ??
        (src ? (
          <Image
            src={src}
            mode="aspectFill"
            className={classNames(bem.e('image'), bem.m(shape))}
          />
        ) : (
          <Icon name="person" className={bem.e('icon')} {...iconProps} />
        ))}
      {extra}
    </View>
  )
}

Avatar.Group = AvatarGroup

export default Avatar
