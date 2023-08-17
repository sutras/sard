import { FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useControllableValue } from '../use'
import Loading from '../loading'
import { BaseProps } from '../base'

type ValueType = any

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

  const [bem] = useBem('switch')

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

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('checked', innerChecked),
        bem.m('disabled', disabled),
        bem.m('readonly', readOnly),
        bem.m('loading', loading),
        className,
      )}
      style={{
        backgroundColor: innerChecked ? checkedColor : uncheckedColor,
        fontSize: size,
        ...style,
      }}
      onClick={onSwitchClick}
    >
      <View
        className={classNames(
          bem.e('thumb'),
          bem.em('thumb', 'checked', innerChecked),
        )}
      >
        {loading && <Loading iconClass={bem.e('loading')} />}
      </View>
    </View>
  )
}

export default Switch
