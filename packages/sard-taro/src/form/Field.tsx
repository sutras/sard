import {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useEvent } from '../use'
import {
  mergeProps,
  toArray,
  scrollIntoView,
  isFunction,
  isNullish,
  noop,
} from '../utils'
import { AnyFunction, BaseProps } from '../base'
import FieldContext from './FieldContext'
import { FormStore } from './createFormStore'
import { ValidateStatus, NamePath, NodeName } from './type'
import { Rule } from './Validator'
import { useNode } from './useNode'
import { NodeContext, useDescendant } from './NodeContext'
import useInternalWatch from './useInternalWatch'

export interface FormFieldProps extends Omit<BaseProps, 'children'> {
  children?:
    | ReactNode
    | ((
        params: {
          value: any
          onChange: AnyFunction
          disabled: boolean
          readOnly: boolean
          required: boolean
        } & FormStore,
      ) => ReactNode)
  layout?: 'horizontal' | 'vertical'
  label?: ReactNode
  labelWidth?: number | string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  required?: boolean
  hidden?: boolean
  unstyled?: boolean
  underline?: boolean
  inlaid?: boolean

  name?: NodeName
  initialValue?: any
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: AnyFunction
  disabled?: boolean
  readOnly?: boolean

  rules?: Rule[]
  validateFirst?: boolean
  validateTrigger?: string | string[]
  validateStatus?: ValidateStatus
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
    labelAlign,
    labelValign,
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
    validateFirst,
    validateTrigger,
    validateStatus,
    feedback,
    extra,

    watch,
    ...restProps
  } = props

  const [bem] = useBem('form-field')

  const { mergedValidateFirst, mergedValidateTrigger } = useDescendant({
    validateFirst,
    validateTrigger,
  })

  useInternalWatch(watch)

  const [node] = useNode({
    type: 'field',
    name,
    label,
    initialValue,
    rules,
    validateFirst: mergedValidateFirst,
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
    labelValign: formlabelValign,
    starPosition: formStarPosition,
    disabled: formDisabled,
    readOnly: fromReadOnly,
  } = useContext(FieldContext)

  const mergedLyaout = layout || formLayout
  const mergedLabelWidth = labelWidth || formLabelWidth
  const mergedLabelAlign = labelAlign || formLabelAlign
  const mergedLabelValign = labelValign || formlabelValign
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

  const changeTriggerNameList = useRef([])
  useEffect(() => {
    if (changeTriggerNameList.current.length > 0) {
      Promise.all(
        changeTriggerNameList.current.map((trigger) =>
          validate({
            triggerName: trigger,
          }).catch(noop),
        ),
      ).finally(() => {
        changeTriggerNameList.current = []
      })
    }
  }, [value])

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

    const triggerProps = {}
    toArray(mergedValidateTrigger)
      .filter(Boolean)
      .forEach((item) => {
        triggerProps[item] = () => {
          changeTriggerNameList.current.push(item)
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
              bem.em('label', `align-${mergedLabelAlign}`),
              bem.em('label', `valign-${mergedLabelValign}`),
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
