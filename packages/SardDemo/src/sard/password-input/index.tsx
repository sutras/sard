import { FC, useEffect, useMemo } from 'react'
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
import { filterNullish, isRN } from '../utils'
import { Animated } from '../animated'
import Halfline from '../halfline'
import CustomWrapper from '../custom-wrapper'

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

type CursorProps = BaseProps

const Cursor: FC<CursorProps> = (props) => {
  function renderCursor(anim?: any) {
    return (
      <Animated.View
        className={props.className}
        style={{
          ...props.style,
          ...(isRN
            ? ({
                opacity: anim,
              } as any)
            : null),
        }}
      />
    )
  }

  if (!isRN) {
    return renderCursor()
  }

  const anim = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  return renderCursor(anim)
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
    postValue(value) {
      return String(value).slice(0, length)
    },
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

  const handleFocus = () => {
    setInnerFocused(true)
  }

  const handleBlur = () => {
    setInnerFocused(false)
  }

  const itemsElement = useMemo(() => {
    return Array(length)
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
              bem.em('item', 'active', active),
              bem.em('item', 'disabled', disabled),
            )}
          >
            <Halfline
              direction="around"
              className={classNames(
                bem.e('halfline'),
                bem.e('halfline'),
                bem.em('halfline', type),
                bem.em('halfline', `${type}-active`, active),
              )}
              style={filterNullish({
                borderLeftColor:
                  gap === 0 && i !== 0 && !active ? 'transparent' : null,
              })}
            />
            {i < innerValue.length &&
              (plainText ? (
                <View
                  className={classNames(
                    bem.e('plaintext'),
                    bem.em('plaintext', 'disabled', disabled),
                  )}
                >
                  {innerValue[i]}
                </View>
              ) : (
                <View
                  className={classNames(
                    bem.e('ciphertext'),
                    bem.em('ciphertext', 'disabled', disabled),
                  )}
                />
              ))}
            {innerFocused && i === innerValue.length && (
              <Cursor className={bem.e('cursor')} />
            )}
          </View>
        )
      })
  }, [length, innerFocused, innerValue, type, plainText, gap, disabled])

  return (
    <CustomWrapper>
      <View
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m('readonly', readOnly),
          bem.m('disabled', disabled),
          className,
        )}
        onClick={handleClick}
        style={{
          ...style,
          ...filterNullish({
            gap,
          }),
        }}
      >
        {itemsElement}

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
    </CustomWrapper>
  )
}

export default PasswordInput
