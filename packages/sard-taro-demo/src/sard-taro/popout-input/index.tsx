import {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { CustomWrapper, View } from '@tarojs/components'
import {
  useBem,
  useControllableValue,
  useEvent,
  useWatchStateSync,
} from '../use'
import { PopoutProps } from '../popout'
import { Input, InputProps } from '../input'
import Icon from '../icon'
import { isEmptyValue, isNullish } from '../utils'
import { BaseProps } from '../base'
import Pressable from '../pressable'

export interface PopoutInputProps extends BaseProps {
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  trigger?: string
  valuePropName?: string
  inputProps?: InputProps
  disabled?: boolean
  readOnly?: boolean
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  title?: ReactNode
  children?: ReactElement<
    {
      withPopout?: boolean
      popoutProps?: PopoutProps
      [key: PropertyKey]: any
    },
    {
      (...args: any[]): any
      alwaysHasValue?: boolean
      outletFormatter?: (props: Record<string, any>, value: any) => string
    }
  >
}

export const PopoutInput: FC<PopoutInputProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue,
    onChange,
    trigger = 'onChange',
    valuePropName = 'value',
    inputProps,
    disabled,
    readOnly,
    visible,
    defaultVisible,
    onVisible,
    title,
    children,
    ...restProps
  } = props

  const [bem] = useBem('popout-input')

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const [tempValue, setTempValue] = useWatchStateSync(innerValue)

  const alwaysHasValue = children?.type?.alwaysHasValue

  const targetRef = useRef<any>()

  const handleConfirm = useEvent(() => {
    let currentTempValue = tempValue
    if (isNullish(tempValue) && alwaysHasValue) {
      const value = targetRef.current.getValueForcibly()
      currentTempValue = value
    }

    setInnerValue(currentTempValue)
  })

  const confirmDisabled = useMemo(() => {
    return isEmptyValue(tempValue)
  }, [tempValue])

  const handlerClear = useEvent(() => {
    setInnerValue(undefined)
  })

  const renderInput = ({ outletValue, disabled, readOnly, setVisible }) => {
    return (
      <Pressable disabled={disabled || readOnly}>
        {({ pressed }) => {
          return (
            <View
              className={classNames(
                bem.b(),
                bem.m('disabled', disabled),
                bem.m('pressed', pressed),
              )}
              onClick={(event) => {
                if (!disabled && !readOnly) {
                  setVisible(true)
                }
                inputProps?.onClick?.(event)
              }}
            >
              <Input
                inlaid
                readOnly={readOnly}
                disabled={disabled}
                append={<Icon className={bem.e('arrow')} name="caret-right" />}
                {...inputProps}
                addon={<View className={bem.e('seal')} />}
                value={isNullish(outletValue) ? '' : String(outletValue)}
                onClear={(event) => {
                  handlerClear()
                  inputProps?.onClear?.(event)
                }}
                style={inputProps?.style}
                className={inputProps?.className}
              />
            </View>
          )
        }}
      </Pressable>
    )
  }

  const renderPopout = () => {
    if (!isValidElement(children)) {
      return null
    }

    const targetProps = {
      [valuePropName]: tempValue,
      [trigger]: (value, ...restArgs) => {
        setTempValue(value)
        children.props?.[trigger]?.(value, ...restArgs)
      },
      withPopout: true,
      popoutProps: {
        ...children.props.popoutProps,
        title,
        visible: innerVisible,
        onVisible: setInnerVisible,
        confirmProps: {
          disabled: !alwaysHasValue && confirmDisabled,
        },
        onConfirm: handleConfirm,
      },
    }

    if (alwaysHasValue) {
      targetProps.ref = targetRef
    }

    return cloneElement(children, targetProps)
  }

  const outletValue = useMemo(() => {
    return children?.type?.outletFormatter?.(children.props, innerValue) || ''
  }, [innerValue])

  return (
    <CustomWrapper>
      <View {...restProps} className={className} style={style}>
        {renderInput({
          outletValue,
          disabled,
          readOnly,
          setVisible: setInnerVisible,
        })}
        {renderPopout()}
      </View>
    </CustomWrapper>
  )
}

export default PopoutInput
