import { Children, cloneElement, ReactElement, FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { Avatar, AvatarProps } from './index'
import { BaseProps } from '../base'

export interface AvatarGroupProps extends BaseProps {
  gap?: string | number
  direction?: 'left' | 'right'
  maxCount?: number
}

export const AvatarGroup: FC<AvatarGroupProps> = (props) => {
  const {
    className,
    children,
    gap,
    direction = 'right',
    maxCount = 5,
    ...restProps
  } = props

  const groupClass = classNames('sar-avatar-group', className)

  const count = Children.count(children)

  return (
    <View {...restProps} className={groupClass}>
      {Children.map(children, (item: ReactElement<AvatarProps>, index) => {
        return index > maxCount - 1
          ? null
          : cloneElement(item, {
              style: {
                marginLeft: index === 0 ? 0 : gap,
                zIndex: direction === 'left' ? count - index : undefined,
              },
            })
      })}
      {count > maxCount && (
        <Avatar className="sar-avatar-rest">+{count - maxCount}</Avatar>
      )}
    </View>
  )
}

export default AvatarGroup
