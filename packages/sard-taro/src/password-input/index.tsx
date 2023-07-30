import { FC, useLayoutEffect } from 'react'
import classNames from 'classnames'
import {
  BaseEventOrig,
  ITouchEvent,
  Input,
  InputProps,
  View,
} from '@tarojs/components'
import { useBem, useControllableValue } from '../use'
import { BaseProps } from '../base'

export interface PasswordInputProps extends Omit<BaseProps, 'children'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  length?: number
  type?: 'border' | 'underline'
  gap?: number | string
  plainText?: boolean
  focused?: boolean
  defaultFocused?: boolean
  onFocused?: (focused: boolean) => void
  onClick?: (event: ITouchEvent) => void
  custom?: boolean
  inputType?: InputProps['type']
  disabled?: boolean
  readOnly?: boolean
}

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue,
    onChange,
    length = 6,
    type = 'border',
    gap,
    plainText,
    focused,
    defaultFocused,
    onFocused,
    onClick,
    custom,
    inputType = 'number',
    disabled,
    readOnly,
    ...restProps
  } = props

  const [bem] = useBem('password-input')

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: '',
  })

  const [innerFocused, setInnerFocused] = useControllableValue({
    value: focused,
    defaultValue: defaultFocused,
    trigger: onFocused,
    initialValue: false,
  })

  const handleClick = (event: ITouchEvent) => {
    onClick?.(event)
  }

  const handleChange = (event: BaseEventOrig<InputProps.inputEventDetail>) => {
    setInnerValue(
      (event.target as unknown as { value: string }).value ??
        event.detail.value,
    )
  }

  useLayoutEffect(() => {
    if (innerValue) {
      setInnerValue(String(innerValue).slice(0, length))
    }
  }, [innerValue])

  const handleFocus = () => {
    setInnerFocused(true)
  }

  const handleBlur = () => {
    setInnerFocused(false)
  }

  const passwordInputClass = classNames(
    bem.b(),
    bem.m('readonly', readOnly),
    bem.m('disabled', disabled),
    className,
  )

  const passwordInputStyle = {
    ...style,
    gap,
  }

  return (
    <View
      {...restProps}
      className={passwordInputClass}
      onClick={handleClick}
      style={passwordInputStyle}
    >
      {Array(length)
        .fill(0)
        .map((_, i) => {
          const active =
            innerFocused &&
            (i === innerValue.length ||
              (i === innerValue.length - 1 && i === length - 1))
          return (
            <View
              key={i}
              className={classNames(
                bem.e('item'),
                bem.em('item', type),
                bem.em('item', `${type}-active`, active),
                bem.em('item', 'active', active),
                bem.em('item', 'lapped', gap === 0 && i !== 0),
              )}
            >
              {i < innerValue.length &&
                (plainText ? (
                  <View className={bem.e('plaintext')}>{innerValue[i]}</View>
                ) : (
                  <View className={bem.e('ciphertext')}></View>
                ))}
              {innerFocused && i === innerValue.length && (
                <View className={bem.e('cursor')}></View>
              )}
            </View>
          )
        })}

      {!custom && (
        <Input
          className={bem.e('input')}
          disabled={disabled || readOnly}
          value={innerValue}
          type={inputType}
          maxlength={length}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </View>
  )
}

export default PasswordInput
