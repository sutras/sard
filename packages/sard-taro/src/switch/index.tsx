import { FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { useControllableValue } from '../use'
import Loading from '../loading'
import { BaseProps } from '../base'

type ValueType = boolean | string | number

export interface SwitchProps extends BaseProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  readOnly?: boolean
  size?: string | number
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: ValueType
  uncheckedValue?: ValueType
  loading?: boolean
  onChange?: (checked: boolean, value: ValueType) => void
  onClick?: (event: ITouchEvent) => void
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

  const [innerChecked, setInnerChecked] = useControllableValue({
    value: checked,
    defaultValue: defaultChecked,
    trigger: onChange,
    initialValue: false,
  })

  const onSwitchClick = (event: ITouchEvent) => {
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
    'sar-switch',
    {
      'sar-switch-checked': innerChecked,
      'sar-switch-disabled': disabled,
      'sar-switch-readonly': readOnly,
      'sar-switch-is-loading': loading,
    },
    className,
  )

  const switchStyle = {
    backgroundColor: innerChecked ? checkedColor : uncheckedColor,
    fontSize: size,
    ...style,
  }

  return (
    <View
      {...restProps}
      className={switchClass}
      style={switchStyle}
      onClick={onSwitchClick}
    >
      <View className="sar-switch-thumb">
        {loading && <Loading iconClass="sar-switch-loading" />}
      </View>
    </View>
  )
}

export default Switch
