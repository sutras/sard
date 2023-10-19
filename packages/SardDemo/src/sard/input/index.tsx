import { useState, ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import {
  ITouchEvent,
  View,
  Input as TaroInput,
  InputProps as TaroInputProps,
  Textarea,
  TextareaProps,
} from '@tarojs/components'
import {
  useBem,
  useControllableValue,
  useSelectorId,
  useSetTimeout,
} from '../use'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { filterNullish, isBoolean, isH5, isNullish, isString } from '../utils'
import Halfline from '../halfline'
import Pressable from '../pressable'
import CustomWrapper from '../custom-wrapper'

interface InputBaseProps extends BaseProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
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
  addon?: ReactNode
  clearable?: boolean
  showClearOnlyFocus?: boolean
  clear?: ReactNode
  onClear?: (value: '') => void
  onClick?: (event: ITouchEvent) => void
  focused?: boolean
  placeholder?: string
}

interface InputInputProps
  extends InputBaseProps,
    Omit<TaroInputProps, 'style' | 'type' | 'ref'> {
  type?: TaroInputProps['type'] | 'password'
  confirmType?: TaroInputProps['confirmType']
}

interface InputTextareaProps
  extends InputBaseProps,
    Omit<TextareaProps, 'style' | 'ref'> {
  type: 'textarea'
  confirmType?: TextareaProps['confirmType']
}

const inputMinHeight = 24
const textareaMinHeight = 52

export type InputProps = InputInputProps | InputTextareaProps

export const Input = (props: InputProps) => {
  const {
    style: {
      height,
      minHeight,
      maxHeight,
      color,
      textAlign,
      ...restStyle
    } = {},
    className,

    value,
    defaultValue,
    onChange,
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
    addon,

    clearable,
    showClearOnlyFocus,
    clear,
    onClear,
    onClick,

    onFocus,
    onBlur,
    focused,

    placeholder = '',
    placeholderClass,
    placeholderStyle,

    cursorSpacing = 10,
    type = 'text',
    confirmType,
    confirmHold,
    ...restProps
  } = props

  const [bem] = useBem('input')

  const controlId = useSelectorId()

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

  const handleClear = (event) => {
    event.stopPropagation?.()
    setInnerValue('')
    onClear?.('')
  }

  const handleTouchStart = (event) => {
    event.stopPropagation?.()
    if (showClearOnlyFocus) {
      setClearVisible(true)
      hideClearLater()
    }
  }

  const handleChange = (event) => {
    const text = event.detail.value
    setInnerValue(text)
    return text
  }

  const [clearVisible, setClearVisible] = useState(false)
  const [hideClearLater] = useSetTimeout(() => {
    setClearVisible(false)
  }, 600)

  useEffect(() => {
    let style: HTMLStyleElement
    if (isH5 && placeholderStyle) {
      style = document.createElement('style')
      style.textContent = `#${controlId} input::-webkit-input-placeholder {${placeholderStyle}}`
      document.head.appendChild(style)
    }
    return () => {
      if (style) {
        document.head.removeChild(style)
      }
    }
  }, [placeholderStyle])

  const finalMinHeight =
    minHeight ?? (type === 'textarea' ? textareaMinHeight : inputMinHeight)

  const controlProps = {
    ...restProps,
    id: controlId,
    autoComplete: 'off',
    value: String(innerValue),
    placeholder,
    placeholderStyle,
    placeholderClass: classNames(placeholderClass, bem.e('placeholder')),
    password: type === 'password',
    maxlength: maxLength,
    disabled: disabled || readOnly,
    autoHeight,
    onInput: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    cursorSpacing,
    style: filterNullish({
      height: autoHeight ? 'auto' : height ?? finalMinHeight,
      minHeight: finalMinHeight,
      maxHeight,
      color,
      textAlign,
    }),

    // rn
    height: height ?? finalMinHeight,
    minHeight: finalMinHeight,
    maxHeight,
    color,
    textAlign,
  }

  const controlClass = classNames(
    bem.e('control'),
    bem.em('control', 'is-textarea', type === 'textarea'),
    bem.em('control', 'readonly', readOnly),
    bem.em('control', 'disabled', disabled),
  )

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

  return (
    <CustomWrapper>
      <View
        style={{
          borderWidth: !inlaid && !borderless ? Halfline.lineWidth : 0,
          ...restStyle,
        }}
        className={classNames(
          bem.b(),
          bem.m('inlaid', inlaid),
          bem.m('borderless', borderless),
          bem.m('disabled', disabled),
          bem.m('focused', focused || innerFocused),
          className,
        )}
        onClick={onClick}
      >
        <View className={bem.e('content')}>
          {!isNullish(prepend) && (
            <View className={bem.e('prepend')}>{prepend}</View>
          )}

          {type === 'textarea' ? (
            <Textarea {...textareaProps} className={controlClass} />
          ) : (
            <TaroInput {...inputProps} className={controlClass} />
          )}

          {clearable && innerValue && !disabled && !readOnly && (
            <Pressable onTouchStart={handleTouchStart} onTouchEnd={handleClear}>
              {() => {
                return (
                  <View
                    className={classNames(
                      bem.e('clear'),
                      bem.em(
                        'clear',
                        'hide',
                        showClearOnlyFocus &&
                          !(focused || innerFocused || clearVisible),
                      ),
                    )}
                  >
                    {clear || (
                      <Icon
                        name="x-circle-fill"
                        className={bem.e('clear-icon')}
                      />
                    )}
                  </View>
                )
              }}
            </Pressable>
          )}

          {!isNullish(append) && (
            <View className={bem.e('append')}>{append}</View>
          )}

          {addon}
        </View>

        {showCount && count && (
          <View
            className={classNames(
              bem.e('count'),
              bem.em('count', 'is-textarea', type === 'textarea'),
            )}
          >
            {count(String(innerValue).length, maxLength)}
          </View>
        )}
      </View>
    </CustomWrapper>
  )
}

export default Input
