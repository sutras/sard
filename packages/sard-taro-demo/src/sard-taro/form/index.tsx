import {
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
  useMemo,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import { CustomWrapper, Form as TaroForm } from '@tarojs/components'

import { FormField } from './Field'
import { FormList } from './List'
import { FormMap } from './Map'
import { FormErrorList } from './ErrorList'
import { FormStore, FormCallbacks, HOOK_KEY } from './createFormStore'
import FieldContext from './FieldContext'
import { useForm } from './useForm'
import useWatch from './useWatch'
import { ValidateMessages } from './Validator'
import useTranslate from '../locale/useTranslate'
import { ScrollIntoViewOptions, deepMerge, isPC, isRN } from '../utils'
import { BaseProps } from '../base'
import { useBem, useSelectorId } from '../use'
import StoreContext from './store/Context'
import { useNode } from './useNode'
import { DescendantContext, NodeContext } from './NodeContext'
import { ValidateStatus } from './type'
import CustomForm from './CustomForm'
import { usePageScroll } from '@tarojs/taro'

const FormElement = isRN || isPC() ? CustomForm : TaroForm

export * from './Field'
export * from './List'
export * from './ErrorList'

export type { FormStore, ValidateStatus }

export interface FormProps extends FormCallbacks, BaseProps {
  initialValues?: Record<string, any>
  form?: FormStore
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
  scrollToFirstError?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions
  validateMessages?: ValidateMessages
  validateTrigger?: string | string[]
  validateFirst?: boolean
}

export type FormRef = FormStore

export interface FormFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<FormProps> & RefAttributes<FormRef>
  > {
  Field: typeof FormField
  Map: typeof FormMap
  List: typeof FormList
  ErrorList: typeof FormErrorList
  useForm: typeof useForm
  useWatch: typeof useWatch
}

export const Form: FormFC = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    className,
    style,
    children,

    onSuccess,
    onFail,
    onReset,

    initialValues,
    form,
    layout = 'horizontal',
    labelWidth,
    labelAlign = 'start',
    labelValign = 'start',
    starPosition = 'left',
    disabled = false,
    readOnly = false,
    scrollToFirstError,
    scrollIntoViewOptions,
    validateMessages,
    validateTrigger = 'onChange',
    validateFirst = true,
    ...restProps
  } = props

  const [bem] = useBem('form')

  const contextId = useSelectorId()

  const [formStore] = useForm(form)

  const { scrollToField } = formStore
  const {
    store,
    relateFormNode,
    setInitialValues,
    setCallbacks,
    setValidateMessages,
  } = formStore.getInternalHooks(HOOK_KEY)

  const [node] = useNode({
    store,
    formStore,
    type: 'form',
  })

  relateFormNode(node)

  useMemo(() => {
    setCallbacks({
      onSuccess,
      onFail: (errors) => {
        if (scrollToFirstError) {
          scrollToField(errors.errorFields[0].name)
        }
        onFail?.(errors)
      },
      onReset,
    })
  }, [onSuccess, onFail, onReset])

  // 验证信息
  const { select } = useTranslate('form.defaultValidateMessages')

  const defaultValidateMessages = useMemo(() => {
    return deepMerge({}, select())
  }, [select()])

  useMemo(() => {
    setValidateMessages(deepMerge(defaultValidateMessages, validateMessages))
  }, [validateMessages])

  // 初始化
  setInitialValues(initialValues, true)

  useEffect(() => {
    setInitialValues(initialValues, false)
  }, [])

  const handleSubmit = () => {
    formStore.submit()
  }

  const handleReset = () => {
    formStore.reset()
  }

  useImperativeHandle(ref, () => formStore, [])

  // scroll
  const pageScrollTop = useRef(0)
  usePageScroll((event) => {
    pageScrollTop.current = event.scrollTop
  })

  const fieldContext = useMemo(() => {
    return {
      formStore,
      layout,
      labelWidth,
      labelAlign,
      labelValign,
      starPosition,
      disabled,
      readOnly,
      contextId,
      pageScrollTop,
      scrollIntoViewOptions,
    }
  }, [
    layout,
    labelWidth,
    labelAlign,
    starPosition,
    disabled,
    readOnly,
    scrollIntoViewOptions,
  ])

  const validateInfo = useMemo(() => {
    return { validateTrigger, validateFirst }
  }, [validateTrigger, validateFirst])

  return (
    <CustomWrapper id={contextId}>
      <StoreContext.Provider value={store}>
        <NodeContext.Provider value={node}>
          <FieldContext.Provider value={fieldContext}>
            <DescendantContext.Provider value={validateInfo}>
              <FormElement
                {...restProps}
                className={classNames(
                  bem.b(),
                  bem.m('layout', layout),
                  className,
                )}
                style={style}
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                {children}
              </FormElement>
            </DescendantContext.Provider>
          </FieldContext.Provider>
        </NodeContext.Provider>
      </StoreContext.Provider>
    </CustomWrapper>
  )
}) as FormFC

Form.Field = FormField
Form.Map = FormMap
Form.List = FormList
Form.ErrorList = FormErrorList
Form.useForm = useForm
Form.useWatch = useWatch

export default Form
