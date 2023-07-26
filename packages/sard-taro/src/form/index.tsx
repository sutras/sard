import {
  FormEvent,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react'
import classNames from 'classnames'

import { FormItem } from './Item'
import { FormList } from './List'
import { FormInstance, FormStoreCallbacks, HOOK_KEY } from './FormStore'
import FormContext from './FormContext'
import useForm from './useForm'
import { ValidateMessages } from './Validator'
import useTranslate from '../locale/useTranslate'
import { extend } from '../utils'
import { AnyType, BaseProps } from '../base'

export * from './Item'
export * from './List'

export interface FormProps extends FormStoreCallbacks, BaseProps {
  initialValues?: Record<string, AnyType>
  form?: FormInstance
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  name?: string
  scrollToFirstError?: boolean
  validateMessages?: ValidateMessages
  validateTrigger?: string | string[]
  validateFirst?: boolean
  disabled?: boolean
  readOnly?: boolean
}

export type FormRef = FormInstance

export interface FormFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<FormProps> & RefAttributes<FormRef>
  > {
  Item: typeof FormItem
  List: typeof FormList
  useForm: typeof useForm
}

export const Form: FormFC = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    className,
    children,
    onSuccess,
    onFail,
    onReset,
    initialValues,
    form,
    layout = 'horizontal',
    labelWidth,
    labelAlign,
    name,
    scrollToFirstError,
    validateMessages,
    validateTrigger,
    validateFirst = false,
    disabled = false,
    readOnly = false,
    ...restProps
  } = props

  void name, validateTrigger, validateFirst

  const [formInstance] = useForm(form)

  const { scrollTo } = formInstance
  const { setInitialValues, setCallbacks, setValidateMessages } =
    formInstance.getInternalHooks(HOOK_KEY)

  setCallbacks({
    onSuccess,
    onFail: (errors) => {
      if (scrollToFirstError) {
        scrollTo(errors[0].name)
      }
      onFail?.(errors)
    },
    onReset,
  })

  const [, s] = useTranslate('form.defaultValidateMessages')

  const defaultValidateMessages = useMemo(() => {
    return extend({}, s())
  }, [s()])

  useMemo(() => {
    setValidateMessages(extend(defaultValidateMessages, validateMessages))
  }, [validateMessages])

  // 初始化
  const initialized = useRef(false)
  setInitialValues(initialValues, !initialized.current)
  if (!initialized.current) {
    initialized.current = true
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    formInstance.submit()
  }

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    formInstance.reset()
  }

  useImperativeHandle(ref, () => formInstance)

  const context = useMemo(() => {
    return {
      formInstance,
      layout,
      labelWidth,
      labelAlign,
      disabled,
      readOnly,
    }
  }, [formInstance, layout, labelWidth, labelAlign, disabled, readOnly])

  return (
    <FormContext.Provider value={context}>
      <form
        {...restProps}
        className={classNames(
          'sar-form',
          {
            [`sar-form-${layout}`]: layout,
          },
          className,
        )}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}) as FormFC

Form.Item = FormItem
Form.List = FormList
Form.useForm = useForm

export default Form

/* 

1. 基础样式、布局
2. 表单域类型
3. 表单验证
4. 重置表单
5. 表单提交
6. 填充表单
7. 滚动到指定表单域
8. 表单域接口（自定义表单域/注册表单域）
9. 禁用表单
10. 表单hook
11. 表单联动
12. 表单方法调用
13. 字段监听
14. 表单列表（动态增减表单项、动态增减嵌套字段）
15. 嵌套结构与校验信息
16. 嵌套多个子元素的表单项
17. 自定义表单控件
18. 表单数据存储于上层组件
19. 多表单联动（Form.Provider）
20. 自行处理表单数据
21. 自定义校验
22. 动态表单校验规则

*/
