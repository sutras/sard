import { CSSProperties, ReactNode, useContext, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { RadioGroup, RadioGroupContext } from './Group'
import { Icon } from '../icon'

export * from './Group'

export interface RadioProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  value?: any
  disabled?: boolean
  size?: string | number
  type?: 'record' | 'check'
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (checked: boolean, value: any) => void
  onClick?: (event: MouseEvent) => void
}

const mapTypeIcon = {
  record: ['circle', 'record-circle'],
  check: ['circle', 'check-circle-fill'],
}

export interface RadioFC extends FC<RadioProps> {
  Group: typeof RadioGroup
}

export const Radio: RadioFC = (props) => {
  const {
    className,
    children,
    checked,
    defaultChecked,
    value = '',
    disabled = false,
    size = '',
    type = 'record',
    onChange,
    onClick,
    icon,
    checkedColor,
    ...restProps
  } = props

  const context = useContext(RadioGroupContext)

  const [innerChecked, setInnerChecked] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
    defaultValue: false,
  })

  const isChecked = context ? context.value === value : innerChecked === true

  const toggle = () => {
    if (isChecked) {
      return
    }
    if (context) {
      onChange?.(true, value)
      context.onChange(value)
    } else {
      setInnerChecked(true, value)
    }
  }

  const handleRadioClick = (event: MouseEvent) => {
    if (!disabled) {
      toggle()
    }
    onClick?.(event)
  }

  const iconStyle = {
    fontSize: size,
    color: isChecked ? checkedColor : '',
  }

  const radioClass = classNames(
    's-radio',
    {
      's-radio-checked': isChecked,
      's-radio-disabled': disabled,
    },
    className,
  )

  return (
    <div {...restProps} className={radioClass} onClick={handleRadioClick}>
      <div className="s-radio-icon" style={iconStyle}>
        {icon ? (
          icon(isChecked)
        ) : (
          <Icon prefix="si" name={mapTypeIcon[type][isChecked ? 1 : 0]}></Icon>
        )}
      </div>
      {children && <div className="s-radio-label">{children}</div>}
    </div>
  )
}

Radio.Group = RadioGroup

export default Radio
