import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'

export interface PickerItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  disabled?: boolean
  height?: number
  onClick?: (event: MouseEvent) => void
}

export const PickerItem: FC<PickerItemProps> = (props) => {
  const { className, style, children, disabled, height, ...restProps } = props

  return (
    <div
      {...restProps}
      className={classNames(
        's-picker-item',
        {
          's-picker-item-disabled': disabled,
        },
        className,
      )}
      style={{ height: height + 'px', ...style }}
    >
      {children}
    </div>
  )
}

export default PickerItem
