import {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useContext,
  useRef,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import FieldContext from './FieldContext'
import { FormStore } from './createFormStore'
import { ValidateStatus, NamePath, NodeName } from './type'
import { useBem, useEvent } from '../use'
import { Rule } from './Validator'
import {
  mergeProps,
  toArray,
  scrollIntoView,
  isFunction,
  isNullish,
} from '../utils'
import { AnyFunction, AnyType, BaseProps } from '../base'
import { useNode } from './useNode'
import { NodeContext } from './NodeContext'
import useInternalWatch from './useInternalWatch'

export interface FormFieldProps extends Omit<BaseProps, 'children'> {
  children?:
    | ReactNode
    | ((
        params: {
          value: AnyType
          onChange: AnyFunction
          disabled: boolean
          readOnly: boolean
          required: boolean
        } & FormStore,
      ) => ReactNode)
  layout?: 'horizontal' | 'vertical'
  label?: ReactNode
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  starPosition?: 'left' | 'right'
  required?: boolean
  hidden?: boolean
  unstyled?: boolean
  underline?: boolean
  inlaid?: boolean

  name?: NodeName
  initialValue?: AnyType
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: AnyFunction
  disabled?: boolean
  readOnly?: boolean

  rules?: Rule[]
  validateFirst?: boolean
  validateStatus?: ValidateStatus
  validateTrigger?: string | string[]
  feedback?: ReactNode
  extra?: ReactNode

  watch?: NamePath[]
}

export const FormField: FC<FormFieldProps> = (props) => {
  const {
    className,
    children,
    layout,
    label,
    labelWidth,
    labelAlign = 'left',
    starPosition,
    required,
    hidden,
    unstyled = false,
    underline = true,
    inlaid,

    name,
    valuePropName = 'value',
    trigger = 'onChange',
    initialValue,
    getValueFromEvent = (value) => value,
    disabled,
    readOnly,

    rules,
    validateFirst = true,
    validateStatus,
    validateTrigger = 'onChange',
    feedback,
    extra,

    watch,
    ...restProps
  } = props

  const [bem] = useBem('form-field')

  useInternalWatch(watch)

  const [node] = useNode({
    type: 'field',
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    required,
  })

  const {
    errors,
    validate,
    setValue,
    value,
    finalRequired,
    finalValidateStatus,
  } = node

  const {
    formStore,
    layout: formLayout,
    labelWidth: formLabelWidth,
    labelAlign: formLabelAlign,
    starPosition: formStarPosition,
    disabled: formDisabled,
    readOnly: fromReadOnly,
  } = useContext(FieldContext)

  const mergedLyaout = layout || formLayout
  const mergedLabelWidth = labelWidth || formLabelWidth
  const mergedLabelAlign = labelAlign || formLabelAlign
  const mergedStarPosition = starPosition || formStarPosition
  const mergedDisabled = disabled || formDisabled
  const mergedReadOnly = readOnly || fromReadOnly

  const mergedFeedback = toArray(feedback ?? errors).filter(Boolean)

  // 实例方法
  const scrollRef = useRef()
  const scrollToField = useEvent((options?: ScrollIntoViewOptions) => {
    if (scrollRef.current) {
      scrollIntoView(scrollRef.current, {
        block: 'center',
        ...options,
      })
    }
  })

  node.data.scrollToField = scrollToField

  const renderField = () => {
    function renderFunction(children) {
      return children({
        ...formStore,
        value,
        onChange: handleChange,
        disabled: mergedDisabled,
        readOnly: mergedReadOnly,
        required: finalRequired,
      })
    }

    if (!isValidElement(children) || isNullish(name)) {
      return isFunction(children) ? renderFunction(children) : children
    }

    const mergedValidateTrigger = toArray(validateTrigger).filter(Boolean)

    const triggerProps = {}
    mergedValidateTrigger.forEach((item) => {
      triggerProps[item] = () => {
        setTimeout(() => {
          validate({
            triggerName: item,
          }).catch(() => {
            void 0
          })
        })
      }
    })

    const handleChange = (...args) => {
      setValue(getValueFromEvent(...args))
    }

    if (isFunction(children)) {
      return renderFunction(children)
    }

    return cloneElement(
      children,
      mergeProps(
        {
          [valuePropName]: value,
          [trigger]: (...args) => {
            handleChange(...args)
            children.props[trigger]?.(...args)
          },
          disabled: mergedDisabled,
          readOnly: mergedReadOnly,
        },
        triggerProps,
      ),
    )
  }

  const mayWrapByNode = (children: ReactNode) => {
    if (isNullish(name)) {
      return <>{children}</>
    } else {
      return (
        <NodeContext.Provider value={node}>{children}</NodeContext.Provider>
      )
    }
  }

  const renderStyledField = () => {
    return (
      <View
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m(mergedLyaout, mergedLyaout),
          bem.m(finalValidateStatus, finalValidateStatus),
          bem.m('hidden', hidden),
          bem.m('underline', underline && !inlaid),
          bem.m('inlaid', inlaid),
          className,
        )}
        ref={scrollRef}
      >
        {!isNullish(label) && (
          <View
            className={classNames(
              bem.e('label'),
              bem.em('label', mergedLabelAlign, mergedLabelAlign),
              bem.em('label', mergedLyaout, mergedLyaout),
            )}
            style={{
              width: mergedLabelWidth,
            }}
          >
            {finalRequired && (
              <View
                className={classNames(
                  bem.e('star'),
                  bem.em('star', mergedStarPosition),
                )}
              >
                *
              </View>
            )}
            <View className={bem.e('label-text')}>{label}</View>
          </View>
        )}
        <View className={bem.e('content')}>
          <View className={bem.e('control')}>{renderField()}</View>
          {mergedFeedback.map((item, i) => (
            <View
              key={i}
              className={classNames(
                bem.e('feedback'),
                bem.em('feedback', finalValidateStatus, finalValidateStatus),
              )}
            >
              {item}
            </View>
          ))}
          {extra && <View className={bem.e('extra')}>{extra}</View>}
        </View>
      </View>
    )
  }

  const renderUnstyledField = () => {
    return renderField()
  }

  return mayWrapByNode(unstyled ? renderUnstyledField() : renderStyledField())
}

export default FormField
