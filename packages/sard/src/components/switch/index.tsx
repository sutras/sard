import { CSSProperties, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import Loading from '../loading'

export interface SwitchProps {
  className?: string
  style?: CSSProperties
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  readOnly?: boolean
  size?: string | number
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  loading?: boolean
  onChange?: (checked: boolean, value: any) => void
  onClick?: (event: MouseEvent) => void
}

export const Switch: FC<SwitchProps> = (props) => {
  const {
    className,
    style,
    checked,
    defaultChecked,
    disabled = false,
    readOnly = false,
    size,
    checkedColor,
    uncheckedColor,
    checkedValue = true,
    uncheckedValue = false,
    loading = false,
    onChange,
    onClick,
    ...restProps
  } = props

  const [innerChecked, setInnerChecked] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
    defaultValue: false,
  })

  const onSwitchClick = (event: MouseEvent) => {
    if (disabled || readOnly || loading) {
      return
    }

    setInnerChecked(
      !innerChecked,
      !innerChecked ? checkedValue : uncheckedValue,
    )

    onClick?.(event)
  }

  const switchClass = classNames(
    's-switch',
    {
      's-switch-checked': innerChecked,
      's-switch-disabled': disabled,
      's-switch-readonly': readOnly,
      's-switch-is-loading': loading,
    },
    className,
  )

  const switchStyle = {
    backgroundColor: innerChecked ? checkedColor : uncheckedColor,
    fontSize: size,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={switchClass}
      style={switchStyle}
      onClick={onSwitchClick}
    >
      <div className="s-switch-thumb">
        {loading && <Loading className="s-switch-loading" />}
      </div>
    </div>
  )
}

export default Switch
