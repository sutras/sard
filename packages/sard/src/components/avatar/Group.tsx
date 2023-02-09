import {
  Children,
  cloneElement,
  CSSProperties,
  ReactNode,
  ReactElement,
  FC,
} from 'react'
import classNames from 'classnames'

import { Avatar, AvatarProps } from './index'

export interface AvatarGroupProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
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

  const groupClass = classNames('s-avatar-group', className)

  const count = Children.count(children)

  return (
    <div {...restProps} className={groupClass}>
      {Children.map(
        children as ReactElement<AvatarProps>,
        (item: ReactElement<AvatarProps>, index) => {
          return index > maxCount - 1
            ? null
            : cloneElement(item, {
                style: {
                  marginLeft: index === 0 ? 0 : gap,
                  zIndex: direction === 'left' ? count - index : void 0,
                },
              })
        },
      )}
      {count > maxCount && (
        <Avatar className="s-avatar-rest">+{count - maxCount}</Avatar>
      )}
    </div>
  )
}

export default AvatarGroup
