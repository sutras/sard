import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'

export interface TagProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
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
  onClick?: (event: MouseEvent) => void
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
    's-tag',
    `s-tag-${theme}`,
    `s-tag-${size}`,
    {
      's-tag-plain': plain,
      's-tag-round': round,
      's-tag-mark': mark,
    },
    className,
  )

  return (
    <div {...restProps} className={tagClass}>
      {children}
      {closable && (
        <Icon
          className="s-tag-close"
          prefix="si"
          name="close"
          onClick={onClose}
        ></Icon>
      )}
    </div>
  )
}

export default Tag
