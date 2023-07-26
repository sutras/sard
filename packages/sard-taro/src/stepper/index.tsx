import { FC, useRef, useState } from 'react'
import { Button, ITouchEvent, InputProps, View } from '@tarojs/components'
import classNames from 'classnames'
import { useControllableValue, useEvent, useLayoutUpdateEffect } from '../use'
import { isNullish, minmax } from '../utils'
import { Icon } from '../icon'
import { Input } from '../input'
import { BaseProps } from '../base'

export interface StepperProps extends Omit<BaseProps, 'children'> {
  inputWidth?: number | string
  value?: number | string
  defaultValue?: number | string
  min?: number
  max?: number
  valueOnClear?: number | null | 'min' | 'max'
  step?: number
  precision?: number
  inputType?: 'number' | 'digit'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  press?: boolean
  pressTime?: number
  interval?: number
  onChange?: (value: number | string) => void
  onBlur?: InputProps['onBlur']
  onFocus?: InputProps['onFocus']
}

export const Stepper: FC<StepperProps> = (props) => {
  const {
    className,
    inputWidth,
    value,
    defaultValue,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    valueOnClear = null,
    step = 1,
    precision,
    inputType = 'number',
    placeholder,
    disabled,
    readOnly,
    press = true,
    pressTime = 350,
    interval = 150,
    onChange,
    onBlur,
    onFocus,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const [inputValue, setInputValue] = useState(innerValue)

  const isMin = !isNullish(innerValue) && Number(innerValue) <= min
  const isMax = !isNullish(innerValue) && Number(innerValue) >= max

  useLayoutUpdateEffect(() => {
    const nextInputValue = Number(value)
    setInputValue(isNaN(nextInputValue) ? '' : nextInputValue)
  }, [value])

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

  const pressTimer = useRef(null)
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
      event.preventDefault()
    }
  })

  const StepperClass = classNames(
    'sar-stepper',
    {
      'sar-stepper-disabled': disabled,
      'sar-stepper-readonly': readOnly,
    },
    className,
  )

  const renderButton = (
    delta: number,
    icon: string,
    reach: boolean,
    cls: string,
  ) => {
    return (
      <Button
        className={classNames(`sar-stepper-button sar-stepper-${cls}`, {
          'sar-stepper-button-disabled': reach,
        })}
        onClick={() => handleClick(delta, reach)}
        disabled={disabled || readOnly || isMin || undefined}
        onTouchStart={() => handleTouchStart(delta)}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <Icon name={icon}></Icon>
      </Button>
    )
  }

  return (
    <View {...restProps} className={StepperClass}>
      {renderButton(-1, 'minus', isMin, 'decrease')}
      <Input
        type={inputType}
        className="sar-stepper-input"
        placeholder={placeholder}
        style={{ width: inputWidth }}
        value={String(inputValue ?? '')}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        disabled={disabled}
        readOnly={readOnly}
      />
      {renderButton(1, 'plus', isMax, 'increase')}
    </View>
  )
}

export default Stepper
