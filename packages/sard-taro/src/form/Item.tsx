import {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'

import FormContext from './FormContext'
import { FieldValidateStatus, HOOK_KEY } from './FormStore'
import { useEvent } from '../use'
import { Rule } from './Validator'
import { mergeProps, toArray, scrollIntoView } from '../utils'
import { AnyFunction, AnyType, BaseProps } from '../base'
import { View } from '@tarojs/components'

export type { Rule }

export interface FormItemProps extends Omit<BaseProps, 'children'> {
  children?:
    | ReactNode
    | ((params: {
        value: AnyType
        onChange: AnyFunction
        disabled: boolean
        readOnly: boolean
      }) => ReactNode)
  layout?: 'horizontal' | 'vertical'
  label?: ReactNode
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  hidden?: boolean
  noStyle?: boolean
  name?: string | number
  valuePropName?: string
  trigger?: string
  initialValue?: AnyType
  getValueFromEvent?: AnyFunction
  rules?: Rule[]
  validateTrigger?: string | string[]
  feedback?: ReactNode
  extra?: ReactNode
  validateStatus?: FieldValidateStatus
  validateFirst?: boolean
  isListField?: boolean
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    className,
    children,
    layout = 'horizontal',
    label,
    labelWidth,
    labelAlign = 'left',
    hidden,
    noStyle = false,
    name,
    valuePropName = 'value',
    trigger = 'onChange',
    initialValue,
    getValueFromEvent = (value) => value,
    rules,
    validateTrigger = 'onChange',
    feedback,
    extra,
    validateStatus,
    validateFirst = true,
    isListField,
    ...restProps
  } = props

  void isListField

  const {
    formInstance,
    layout: formLayout,
    labelWidth: formLabelWidth,
    labelAlign: formLabelAlign,
    disabled,
    readOnly,
  } = useContext(FormContext)

  const { registerField, unregisterField, getInitialValues, validator } =
    formInstance.getInternalHooks(HOOK_KEY)

  const getInitialValue = () => {
    const value = getInitialValues()[name]

    return value !== undefined ? value : initialValue
  }

  const [value, setValue] = useState(() => getInitialValue())
  const [errors, setErrors] = useState<string[]>()
  const errorsRef = useRef(errors)
  errorsRef.current = errors

  const [innerValidateStatus, setInnerValidateStatus] =
    useState<FormItemProps['validateStatus']>('unvalidated')

  const getName = useEvent(() => name)
  const getValue = useEvent(() => value)

  const reset = useEvent(() => {
    setValue(getInitialValue())
    setErrors(null)
    setInnerValidateStatus('unvalidated')
  })

  const validate = useEvent((triggerName?: string) => {
    return new Promise((resolve, reject) => {
      if (!rules) {
        setErrors(null)
        setInnerValidateStatus('passed')

        return resolve({
          name,
          value,
        })
      }

      let filteredRules = rules

      if (triggerName) {
        filteredRules = rules
          .filter((rule) => rule)
          .filter((rule) => {
            const { trigger } = rule
            if (!trigger) {
              return true
            }
            if (Array.isArray(trigger)) {
              return trigger.includes(triggerName)
            } else {
              return trigger === triggerName
            }
          })
      }

      validator
        .validate(filteredRules, {
          validateFirst,
          value,
          label,
          name,
        })
        .then(() => {
          setErrors(null)
          setInnerValidateStatus('passed')

          resolve({
            name,
            value,
          })
        })
        .catch((errors) => {
          setErrors(errors)
          setInnerValidateStatus('failed')

          reject({
            name,
            value,
            errors,
          })
        })
    })
  })

  const scrollRef = useRef()
  const scrollToError = useEvent((options?: ScrollIntoViewOptions) => {
    if (scrollRef.current) {
      scrollIntoView(scrollRef.current, {
        block: 'center',
        ...options,
      })
    }
  })

  const getErrors = useEvent(() => {
    return errors
      ? {
          name,
          value,
          errors,
        }
      : null
  })

  const getValidateStatus = useEvent(() => {
    return innerValidateStatus
  })

  const fieldInstance = useMemo(() => {
    return {
      getName,
      getValue,
      setValue: (value) => {
        setValue(value)
        if (errorsRef.current) {
          setTimeout(() => {
            validate()
          })
        }
      },
      reset,
      validate,
      scrollToError,
      getErrors,
      getValidateStatus,
    }
  }, [])

  useEffect(() => {
    registerField(fieldInstance)

    return () => {
      unregisterField(fieldInstance)
    }
  }, [name])

  const renderElement = () => {
    const mergedValidateTrigger = Array.isArray(validateTrigger)
      ? validateTrigger
      : [validateTrigger].filter((item) => !!item)

    const triggerProps = {}
    mergedValidateTrigger.forEach((item) => {
      triggerProps[item] = () => {
        setTimeout(() => {
          validate(item).catch(() => {
            void 0
          })
        })
      }
    })

    const onChange = (...args) => {
      setValue(getValueFromEvent(...args))
    }

    if (typeof children === 'function') {
      return (
        <>
          {children({
            value,
            onChange,
            disabled,
            readOnly,
          })}
        </>
      )
    }

    if (!isValidElement(children) || !name) {
      return <>{children}</>
    }

    return cloneElement(
      children,
      mergeProps(
        {
          [valuePropName]: value,
          [trigger]: onChange,
          disabled,
          readOnly,
        },
        triggerProps,
      ),
    )
  }

  const mergedValidateStatus = validateStatus || innerValidateStatus

  const mergedFeedback = toArray(feedback ?? errors).filter(Boolean)

  const mergedLyaout = layout || formLayout
  const mergedLabelWidth = labelWidth || formLabelWidth
  const mergedLabelAlign = labelAlign || formLabelAlign

  if (noStyle) {
    return renderElement()
  }

  return (
    <View
      {...restProps}
      className={classNames(
        'sar-form-item',
        {
          [`sar-form-item-${mergedLyaout}`]: mergedLyaout,
          [`sar-form-item-is-${mergedValidateStatus}`]: mergedValidateStatus,
          'sar-form-item-hidden': hidden,
        },
        className,
      )}
      ref={scrollRef}
    >
      <View
        className={classNames('sar-form-item-label', {
          [`sar-form-item-label-${mergedLabelAlign}`]: mergedLabelAlign,
        })}
        style={{
          width: mergedLabelWidth,
        }}
      >
        {label}
      </View>
      <View className="sar-form-item-content">
        <View className="sar-form-item-control">{renderElement()}</View>
        {mergedFeedback.map((item, i) => (
          <View key={i} className="sar-form-item-feedback">
            {item}
          </View>
        ))}
        {extra && <View className="sar-form-item-extra">{extra}</View>}
      </View>
    </View>
  )
}

export default FormItem
