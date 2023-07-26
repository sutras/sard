import { FC, useLayoutEffect } from 'react'
import classNames from 'classnames'
import {
  BaseEventOrig,
  ITouchEvent,
  Input,
  InputProps,
  View,
} from '@tarojs/components'
import { useControllableValue } from '../use'
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
    'sar-password-input',
    `sar-password-input-${type}`,
    {
      'sar-password-input-gapless': gap === 0,
      'sar-password-input-readonly': readOnly,
      'sar-password-input-disabled': disabled,
    },
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
          return (
            <View
              key={i}
              className={classNames('sar-password-input-item', {
                'sar-password-input-item-active':
                  innerFocused &&
                  (i === innerValue.length ||
                    (i === innerValue.length - 1 && i === length - 1)),
              })}
            >
              {i < innerValue.length &&
                (plainText ? (
                  <View className="sar-password-input-plaintext">
                    {innerValue[i]}
                  </View>
                ) : (
                  <View className="sar-password-input-ciphertext"></View>
                ))}
              {innerFocused && i === innerValue.length && (
                <View className="sar-password-input-cursor"></View>
              )}
            </View>
          )
        })}

      {!custom && (
        <Input
          className="sar-password-input-input"
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
