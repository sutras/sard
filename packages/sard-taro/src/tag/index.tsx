import { FC } from 'react'
import { View, ITouchEvent } from '@tarojs/components'
import classNames from 'classnames'
import { Icon } from '../icon'
import { BaseProps } from '../base'

export interface TagProps extends BaseProps {
  theme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
  round?: boolean
  plain?: boolean
  mark?: boolean
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  onClose?: () => void
  onClick?: (event: ITouchEvent) => void
}

export const Tag: FC<TagProps> = (props) => {
  const {
    className,
    children,
    theme = 'default',
    plain,
    round,
    mark,
    size = 'medium',
    closable,
    onClose,
    ...restProps
  } = props

  const tagClass = classNames(
    'sar-tag',
    `sar-tag-${theme}`,
    `sar-tag-${size}`,
    {
      'sar-tag-plain': plain,
      'sar-tag-round': round,
      'sar-tag-mark': mark,
    },
    className,
  )

  return (
    <View {...restProps} className={tagClass}>
      {children}
      {closable && (
        <Icon className="sar-tag-close" name="close" onClick={onClose}></Icon>
      )}
    </View>
  )
}

export default Tag
