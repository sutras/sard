import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { Cell } from '../cell'

export interface DropdownOptionProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: string
  value?: any
  active?: boolean
  onClick?: () => void
}

export const DropdownOption: FC<DropdownOptionProps> = (props) => {
  const {
    className,
    style,
    children,
    label,
    value,
    active,
    onClick,
    ...restProps
  } = props

  const optionClass = classNames(
    's-dropdown-option',
    {
      's-dropdown-item-option-active': active,
    },
    className,
  )

  return (
    <Cell
      {...restProps}
      className={optionClass}
      title={label}
      isLink
      arrow={
        <div className="s-dropdown-option-icon">
          <Icon prefix="si" name="success"></Icon>
        </div>
      }
      onClick={onClick}
    ></Cell>
  )
}

export default DropdownOption
