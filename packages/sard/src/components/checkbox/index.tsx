import { CSSProperties, ReactNode, useContext, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CheckboxGroup, CheckboxGroupContext } from './Group'
import { Icon } from '../icon'

export * from './Group'

export interface CheckboxProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  value?: any
  disabled?: boolean
  size?: string | number
  type?: 'square' | 'circle'
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (checked: boolean, value: any) => void
  onClick?: (event: MouseEvent) => void
}

const mapTypeIcon = {
  square: ['square', 'check-square-fill'],
  circle: ['circle', 'check-circle-fill'],
}

export interface CheckboxFC extends FC<CheckboxProps> {
  Group: typeof CheckboxGroup
}

export const Checkbox: CheckboxFC = (props) => {
  const {
    className,
    children,
    checked,
    defaultChecked,
    value,
    disabled = false,
    size,
    type = 'square',
    onChange,
    onClick,
    icon,
    checkedColor,
    ...restProps
  } = props

  const context = useContext(CheckboxGroupContext)

  const [innerChecked, setInnerChecked] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
  })

  const isChecked = context
    ? context.value.includes(value)
    : innerChecked === true

  const toggle = () => {
    if (context) {
      const groupValue = isChecked
        ? context.value.filter((item) => item !== value)
        : context.value.concat(value)

      onChange?.(!isChecked, value)
      context.onChange(groupValue)
    } else {
      setInnerChecked((prevChecked) => !prevChecked, value)
    }
  }

  const handleCheckboxClick = (event: MouseEvent) => {
    if (!disabled) {
      toggle()
    }
    onClick?.(event)
  }

  const iconStyle = {
    fontSize: size,
    color: isChecked ? checkedColor : '',
  }

  const checkboxClass = classNames(
    's-checkbox',
    {
      's-checkbox-checked': isChecked,
      's-checkbox-disabled': disabled,
    },
    className,
  )

  return (
    <div {...restProps} className={checkboxClass} onClick={handleCheckboxClick}>
      <div className="s-checkbox-icon" style={iconStyle}>
        {icon ? (
          icon(isChecked)
        ) : (
          <Icon prefix="si" name={mapTypeIcon[type][isChecked ? 1 : 0]}></Icon>
        )}
      </div>
      {children && <div className="s-checkbox-label">{children}</div>}
    </div>
  )
}

Checkbox.Group = CheckboxGroup

export default Checkbox
