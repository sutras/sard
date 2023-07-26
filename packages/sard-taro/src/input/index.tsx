import { useState, ReactNode, useRef, forwardRef } from 'react'
import {
  ITouchEvent,
  View,
  Input as TaroInput,
  InputProps as TaroInputProps,
  Textarea,
  TextareaProps,
} from '@tarojs/components'
import classNames from 'classnames'
import { useControllableValue } from '../use'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { isBoolean, isString } from '../utils'

interface InputBaseProps extends BaseProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  showCount?: boolean
  count?: (currentCount: number, maxLength: number) => ReactNode
  autoHeight?: boolean
  borderless?: boolean
  inlaid?: boolean
  prepend?: ReactNode
  append?: ReactNode
  clearable?: boolean
  clear?: ReactNode
  onClear?: (value: '') => void
  onChange?: (value: string) => void
  onClick?: (event: ITouchEvent) => void
  focused?: boolean
}

interface InputInputProps
  extends InputBaseProps,
    Omit<TaroInputProps, 'style' | 'type'> {
  type?: TaroInputProps['type'] | 'password'
  confirmType?: TaroInputProps['confirmType']
}

interface InputTextareaProps
  extends InputBaseProps,
    Omit<TextareaProps, 'style'> {
  type: 'textarea'
  confirmType?: TextareaProps['confirmType']
}

export type InputProps = InputInputProps | InputTextareaProps

// type TT = 'send' | 'search' | 'go' | 'done' | 'next'| 'return'
// type IT = 'send' | 'search' | 'go' | 'done' | 'next'

type InputRef = HTMLInputElement | HTMLTextAreaElement

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    style,
    className,
    value,
    defaultValue,
    type = 'text',
    placeholder = '',
    disabled,
    readOnly,
    maxLength = 140,
    showCount,
    count = (currentCount, maxLength) =>
      `${currentCount}${maxLength !== -1 && ' / ' + maxLength}`,
    autoHeight,
    borderless,
    inlaid,
    prepend,
    append,
    clearable,
    clear,
    onClear,
    onChange,
    onFocus,
    onBlur,
    onClick,
    focused,
    cursorSpacing = 10,
    confirmType,
    confirmHold,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: '',
  })

  const [innerFocused, setInnerFocused] = useState(false)

  const handleFocus = (event) => {
    setInnerFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event) => {
    setInnerFocused(false)
    onBlur?.(event)
  }

  const handleClear = (event: ITouchEvent) => {
    event.stopPropagation()

    setInnerValue('')
    onClear?.('')
  }

  const handleChange = (event) => {
    setInnerValue(event.detail.value)
  }

  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>()

  const controlProps = {
    ...restProps,
    className: 'sar-input-control',
    autoComplete: 'off',
    value: String(innerValue),
    placeholder,
    placeholderClass: 'sar-input-placeholder',
    password: type === 'password',
    maxlength: maxLength,
    disabled: disabled || readOnly,
    autoHeight,
    onInput: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
    cursorSpacing,
    style: {
      maxHeight: style?.maxHeight,
      minHeight: style?.minHeight,
    },
  }

  const inputProps = {
    ...controlProps,
    type: type === 'password' || type === 'textarea' ? 'text' : type,
    confirmType: confirmType !== 'return' ? confirmType : undefined,
    confirmHold: isBoolean(confirmHold) ? confirmHold : undefined,
  }

  const textareaProps = {
    ...controlProps,
    confirmType,
    confirmHold: isString(confirmHold) ? confirmHold : undefined,
  }

  const inputRefCb = (el) => {
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      ref.current = el
    }
    inputRef.current = el
  }

  const handleRootClick = (event: ITouchEvent) => {
    // if (event.currentTarget === event.target) {
    // }
    inputRef.current?.focus()

    onClick?.(event)
  }

  const inputClass = classNames(
    'sar-input',
    {
      'sar-input-inlaid': inlaid,
      'sar-input-borderless': borderless,
      'sar-input-disabled': disabled,
      'sar-input-readonly': readOnly,
      'sar-input-focused': focused || innerFocused,
      'sar-input-is-textarea': type === 'textarea',
    },
    className,
  )

  return (
    <View
      style={{ ...style, minHeight: null, maxHeight: null }}
      className={inputClass}
      onClick={handleRootClick}
    >
      {prepend && <View className="sar-input-prepend">{prepend}</View>}

      {type === 'textarea' ? (
        <Textarea {...textareaProps} ref={inputRefCb} />
      ) : (
        <TaroInput {...inputProps} ref={inputRefCb} />
      )}

      {append && <View className="sar-input-append">{append}</View>}

      {clearable && innerValue && !disabled && !readOnly && (
        <View className="sar-input-clear" onClick={handleClear}>
          {clear || (
            <Icon name="x-circle-fill" className="sar-input-clear-icon"></Icon>
          )}
        </View>
      )}

      {showCount && count && (
        <View className="sar-input-count">
          {count(String(innerValue).length, maxLength)}
        </View>
      )}
    </View>
  )
})

export default Input
