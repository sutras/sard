import { Children, cloneElement, ReactElement, FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { Avatar, AvatarProps } from './index'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export interface AvatarGroupProps extends BaseProps {
  gap?: string | number
  direction?: 'left' | 'right'
  maxCount?: number
}

export const AvatarGroup: FC<AvatarGroupProps> = (props) => {
  const {
    className,
    style,
    children,

    gap,
    direction = 'right',
    maxCount = 5,
    ...restProps
  } = props

  const [bem] = useBem('avatar')

  const count = Children.count(children)

  return (
    <View
      {...restProps}
      className={classNames(bem.e('group'), className)}
      style={style}
    >
      {Children.map(children, (item: ReactElement<AvatarProps>, index) => {
        return index > maxCount - 1
          ? null
          : cloneElement(item, {
              className: classNames(
                bem.m('in-group'),
                bem.m('later', index > 0),
              ),
              style: filterNullish({
                marginLeft: index === 0 ? 0 : gap,
                zIndex: direction === 'left' ? count - index : undefined,
              }),
            })
      })}
      {count > maxCount && (
        <Avatar
          className={bem.m('rest')}
          style={filterNullish({
            marginLeft: gap,
            zIndex: direction === 'left' ? 0 : undefined,
          })}
        >
          {'+' + (count - maxCount)}
        </Avatar>
      )}
    </View>
  )
}

export default AvatarGroup
