import { CSSProperties, FC, useMemo, useRef, useState } from 'react'
import {
  CustomWrapper,
  ITouchEvent,
  InputProps,
  View,
} from '@tarojs/components'
import classNames from 'classnames'
import {
  useBem,
  useControllableValue,
  useEvent,
  useLayoutUpdateEffect,
} from '../use'
import { createMouseBinder, isNullish, isPC, isString, minmax } from '../utils'
import { Icon } from '../icon'
import { Input } from '../input'
import { BaseProps } from '../base'
import Pressable from '../pressable'

export interface StepperProps extends Omit<BaseProps, 'children'> {
  value?: number | string
  defaultValue?: number | string
  onChange?: (value: number | string) => void
  min?: number
  max?: number
  valueOnClear?: number | null | 'min' | 'max'
  step?: number
  precision?: number
  inputStyle?: CSSProperties
  inputType?: 'number' | 'digit' | 'text'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  press?: boolean
  pressTime?: number
  interval?: number
  onBlur?: InputProps['onBlur']
  onFocus?: InputProps['onFocus']
  size?: number
}

export const Stepper: FC<StepperProps> = (props) => {
  const {
    className,
    style,

    value,
    defaultValue,
    onChange,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    valueOnClear,
    step = 1,
    precision,
    inputStyle,
    inputType = 'number',
    placeholder,
    disabled,
    readOnly,
    press = true,
    pressTime = 350,
    interval = 150,
    onBlur,
    onFocus,
    size = 36,
    ...restProps
  } = props

  const [bem] = useBem('stepper')

  const [innerValue, setInnerValue] = useControllableValue<
    number | string | null | undefined
  >({
    value,
    defaultValue,
    trigger: onChange,
  })

  const [inputValue, setInputValue] = useState(innerValue)

  const isMin = !isNullish(innerValue) && Number(innerValue) <= min
  const isMax = !isNullish(innerValue) && Number(innerValue) >= max

  useLayoutUpdateEffect(() => {
    function isZeroAfterCoercionButNotLiteral(target: any) {
      if (
        target === null ||
        target === false ||
        (isString(target) && target.trim() === '')
      ) {
        return true
      }
    }

    const nextInputValue = Number(innerValue)
    setInputValue(
      isNaN(nextInputValue) || isZeroAfterCoercionButNotLiteral(innerValue)
        ? ''
        : nextInputValue,
    )
  }, [innerValue])

  const setValueEnsureSafe = (val: number) => {
    setInnerValue(val)
    setInputValue(val)
  }

  const normalizedValue = (value: number) => {
    value = minmax(value, min, max)
    if (precision !== undefined) {
      value = +value.toFixed(precision)
    }
    return value
  }

  // # 输入框
  const getValueOnClear = () => {
    return valueOnClear === 'min'
      ? min
      : valueOnClear === 'max'
      ? max
      : valueOnClear
  }
  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (value === '') {
      setInnerValue(getValueOnClear())
    }
  }
  const handleBlur = (event) => {
    if (inputValue !== '') {
      const nextValue = Number(inputValue)
      if (isNaN(nextValue)) {
        setInputValue('')
        setInnerValue(getValueOnClear())
      } else {
        setValueEnsureSafe(normalizedValue(nextValue))
      }
    }

    onBlur?.(event)
  }

  // # 按钮
  const setByStep = useEvent((delta: number) => {
    setValueEnsureSafe(
      normalizedValue((Number(innerValue) || 0) + step * delta),
    )
  })

  const handleClick = (delta: number, reach: boolean) => {
    if (!disabled && !readOnly && !reach) {
      setByStep(delta)
    }
  }

  const pressTimer = useRef<any>()
  const isPressing = useRef(false)

  const handleLongPress = (delta: number) => {
    setTimeout(() => {
      if (isPressing.current) {
        setByStep(delta)
        handleLongPress(delta)
      }
    }, interval)
  }

  const handleTouchStart = useEvent((delta: number) => {
    if (
      !press ||
      disabled ||
      readOnly ||
      (delta === -1 && isMin) ||
      (delta === 1 && isMax)
    ) {
      return
    }

    isPressing.current = false
    clearTimeout(pressTimer.current)

    pressTimer.current = setTimeout(() => {
      isPressing.current = true
      handleLongPress(delta)
    }, pressTime)
  })

  const handleTouchEnd = useEvent((event: ITouchEvent) => {
    clearTimeout(pressTimer.current)

    if (isPressing.current) {
      isPressing.current = false
      event.preventDefault?.()
    }
  })

  const minusMouseBinder = useMemo(() => {
    return isPC()
      ? createMouseBinder({
          onStart() {
            handleTouchStart(-1)
          },
          onEnd: handleTouchEnd,
        })
      : null
  }, [])

  const plusMouseBinder = useMemo(() => {
    return isPC()
      ? createMouseBinder({
          onStart() {
            handleTouchStart(1)
          },
          onEnd: handleTouchEnd,
        })
      : null
  }, [])

  const renderButton = (
    delta: number,
    icon: string,
    reach: boolean,
    cls: string,
    mouseBinder: null | { onMouseDown: (event: any) => void },
  ) => {
    return (
      <Pressable
        disabled={reach || disabled || readOnly}
        onTouchStart={() => handleTouchStart(delta)}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {({ pressed }) => (
          <View
            className={classNames(
              bem.e('button'),
              bem.e(cls),
              bem.em('button', 'disabled', disabled || reach),
              bem.em('button', 'readonly', readOnly),
              bem.em('button', 'pressed', pressed),
            )}
            style={{ width: size, height: size }}
            onClick={() => handleClick(delta, reach)}
            {...mouseBinder}
          >
            <Icon name={icon} />
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <CustomWrapper>
      <View
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m('disabled', disabled),
          bem.m('readonly', readOnly),
          className,
        )}
        style={style}
      >
        {renderButton(-1, 'minus', isMin, 'decrease', minusMouseBinder)}
        <Input
          type={inputType}
          className={bem.e('input')}
          placeholder={placeholder}
          style={{ ...inputStyle, height: size }}
          value={String(inputValue ?? '')}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
        />
        {renderButton(1, 'plus', isMax, 'increase', plusMouseBinder)}
      </View>
    </CustomWrapper>
  )
}

export default Stepper
