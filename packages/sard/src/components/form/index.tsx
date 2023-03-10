import {
  CSSProperties,
  ReactNode,
  FormEvent,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
  useMemo,
} from 'react'
import classNames from 'classnames'

import { FormItem } from './Item'
import { FormStore, FormInstance } from './FormStore'
import FormContext from './FormContext'

export * from './Item'

export interface FormProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onSuccess?: (values: Record<string, any>) => void
  onFail?: (
    values: Record<string, any>,
    errors: Record<string, string[]>,
  ) => void
  onReset?: (event: FormEvent<HTMLFormElement>) => void
  initialValue?: any
}

export interface FormRef extends FormInstance {}

export interface FormFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<FormProps> & RefAttributes<FormRef>
  > {
  Item: typeof FormItem
}

export const Form: FormFC = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    className,
    children,
    onSuccess,
    onFail,
    onReset,
    initialValue,
    ...restProps
  } = props

  const formStore = useMemo(() => {
    return new FormStore(initialValue)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    formStore
      .validate()
      .then(() => {
        onSuccess?.(formStore.getValues())
      })
      .catch(() => {
        onFail?.(formStore.getValues(), {})
      })
  }

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onReset?.(event)
  }

  useImperativeHandle(ref, () => formStore.getForm())

  return (
    <FormContext.Provider value={formStore}>
      <form
        {...restProps}
        className={classNames('s-form', className)}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}) as FormFC

Form.Item = FormItem

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
