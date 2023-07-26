# Form 表单

### 介绍

用于数据采集，由各种类型的表单域组成，可对数据进行校验、清除、重置、提交等操作。

### 引入

```js
import { Form } from 'sard-taro'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Status.tsx"
  ]
</script>

## API

### FormProps

| 属性               | 描述                                                         | 类型                                  | 默认值       |
| ------------------ | ------------------------------------------------------------ | ------------------------------------- | ------------ |
| initialValues      | 表单默认值，只有初始化以及重置时生效                         | Record<string, any>                   | -            |
| form               | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | FormInstance                          | -            |
| layout             | 设置表单项的布局                                             | 'horizontal' \| 'vertical'            | 'horizontal' |
| labelWidth         | 设置标签宽度                                                 | number \| string                      | -            |
| labelAlign         | 设置标签对齐方式                                             | 'left' \| 'right'                     | 'left'       |
| name               | 表单名称                                                     | string                                | -            |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段                             | boolean \| ScrollIntoViewOptions      | false        |
| validateMessages   | 验证提示模板                                                 | ValidateMessages                      | -            |
| disabled           | 禁用表单组件                                                 | boolean                               | false        |
| readOnly           | 使表单组件只读                                               | boolean                               | false        |
| validateFirst      | 是否在某一项校验不通过时停止校验                             | boolean                               | false        |
| onSuccess          | 提交成功时触发                                               | (values: Record<string, any>) => void | -            |
| onFail             | 提交失败时触发                                               | (errors: ErrorInfo[]) => void         | -            |
| onReset            | 重置时触发                                                   | () => void                            | -            |

### ErrorInfo

```ts
interface ErrorInfo {
  errors: string[]
  name: string
  value: any
}
```

### FormItemProps

| 属性                | 描述                                                | 类型                                              | 默认值           |
| ------------------- | --------------------------------------------------- | ------------------------------------------------- | ---------------- |
| layout              | 设置表单项的布局                                    | 'horizontal' \| 'vertical'                        | 'horizontal'     |
| label               | 标签名                                              | React.ReactNode                                   | -                |
| labelWidth          | 设置标签宽度                                        | number \| string                                  | -                |
| labelAlign          | 设置标签对齐方式                                    | 'left' \| 'right'                                 | 'left'           |
| hidden              | 是否隐藏字段（依然会收集和校验字段）                | boolean                                           | false            |
| noStyle             | 是否无样式，仅处理行为                              | boolean                                           | false            |
| required            | 必填样式设置。如不设置，则会根据校验规则自动生成    | boolean                                           | false            |
| name                | 表单项的名称，用于校验、或设置、获取值等操作        | string                                            | -                |
| valuePropName       | 子组件值的属性                                      | string                                            | 'vallue'         |
| trigger             | 子组件值改变时的回调名                              | string                                            | 'onChange'       |
| initialValue        | 子组件初始值，`Form` 的 `initialValues ` 优先级较高 | any                                               | -                |
| getValueFromTrigger | 设置如何从值改变的回调中提取字段值                  | (...args: any[]) => any                           | (value) => value |
| rules               | 校验规则                                            | Rule[]                                            | -                |
| validateTrigger     | 触发规则校验的时机                                  | string \| string[]                                | 'onChange'       |
| feedback            | 自定义反馈信息，不设置则根据规则自动生成            | React.ReactNode                                   | -                |
| extra               | 自定义额外信息                                      | React.ReactNode                                   | -                |
| validateStatus      | 自定义验证状态                                      | 'success' \| 'warning' \| 'error' \| 'validating' | -                |
| validateFirst       | 是否在某一规则校验不通过时停止校验                  | boolean                                           | false            |

### Rule

| 属性       | 描述                                                                             | 类型                                                                             | 默认值   |
| ---------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| validator  | 通过函数来自定义验证                                                             | (value: any, rule: Rule) => Promise<void> \| boolean \| string                   | -        |
| pattern    | 通过正则来进行校验                                                               | RegExp                                                                           | -        |
| message    | 校验失败的反馈文案                                                               | string \| (() => string)                                                         | -        |
| trigger    | 触发校验的时机                                                                   | 'onBlur' \| 'onChange' \| 'onSubmit' \| ('onBlur' \| 'onChange' \| 'onSubmit')[] | -        |
| transform  | 将值转换后再进行校验                                                             | (value: any, rule: Rule) => any                                                  | -        |
| required   | 是否为必选字段，当值为空值时 `'', [], false, undefined, null`，校验不通过        | boolean                                                                          | false    |
| type       | 使用内置的校验规则                                                               | ValidatorType                                                                    | 'string' |
| len        | 当 `type` 为字符串（字符串长度）、数值（等于数值）、数组（数组长度）时有效       | number                                                                           | -        |
| min        | 当 `type` 为字符串（字符串最小长度）、数值（最小值）、数组（数组最小长度）时有效 | number                                                                           | -        |
| max        | 当 `type` 为字符串（字符串最大长度）、数值（最大值）、数组（数组最大长度）时有效 | number                                                                           | -        |
| whitespace | `type` 为 `'string'` 时，如果字段仅包含空格则校验不通过                          | boolean                                                                          | false    |

### Rule['validator'] 说明

如何函数返回 `true`，或者返回 `fulfilled` 状态的 `Promise` 表示验证通过；返回 `false` 或 `rejected` 状态的 `Promise` 表示验证失败。当返回字符串或返回的 `Promise` 的 `catch` 函数参数为字符串时，此字符串会替换 `message`。

### ValidatorType

| 类型     | 描述                                                                   |
| -------- | ---------------------------------------------------------------------- |
| string   | 必须为字符串                                                           |
| number   | 必须为数值                                                             |
| boolean  | 必须为布尔值                                                           |
| function | 必须为函数                                                             |
| regexp   | 必须为 `RegExp` 类型，或者作为 `RegExp()` 参数被实例化不会报错的字符串 |
| integer  | 必须为数值，且为整数                                                   |
| float    | 必须为数值，且为小数                                                   |
| array    | 必须为数组                                                             |
| object   | 必须为对象，且不为数组和 `null`                                        |
| enum     | 必须存在于 `enum` 中                                                   |
| date     | 必须为 `Date` 类型                                                     |
| url      | 必须为 `url`                                                           |
| hex      | 必须为 `hex`                                                           |
| email    | 必须为邮件                                                             |

### ValidateMessages

```ts
interface ValidateMessages {
  default?: string
  required?: string
  enum?: string
  whitespace?: string
  date: {
    format?: string
    parse?: string
    invalid?: string
  }
  types?: {
    string?: string
    function?: string
    array?: string
    object?: string
    number?: string
    date?: string
    boolean?: string
    integer?: string
    float?: string
    regexp?: string
    email?: string
    url?: string
    hex?: string
  }
  string?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  number?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  array?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  pattern?: {
    mismatch?: string
  }
}
```

### ScrollIntoViewOptions

```ts
export interface ScrollIntoViewOptions {
  block?: ScrollIntoViewPosition
  inline?: ScrollIntoViewPosition
  blockOffset?: number
  inlineOffset?: number
  topOffset?: number
  bottomOffset?: number
  leftOffset?: number
  rightOffset?: number
}
```

```ts
type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'
```

### FormListProps

| 属性         | 描述                                                              | 类型                                                                       | 默认值 |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| children     | 渲染函数                                                          | (fields: Field[], operation: FormListOperation, meta: { errors }) => React | -      |
| initialValue | 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准 | any[]                                                                      | -      |
| name         | 字段名                                                            | string                                                                     | -      |
| rules        | 校验规则                                                          | Rule[]                                                                     | -      |

### FormListOperation

| 属性   | 描述       | 类型                                               | 默认值 |
| ------ | ---------- | -------------------------------------------------- | ------ |
| add    | 新增表单项 | (defaultValue?: any, insertIndex?: number) => void | -      |
| move   | 移动表单项 | (from: number, to: number) => void                 | -      |
| remove | 删除表单项 | (index: number \| number[]) => void                | -      |

## 主题定制

### CSS 变量

%{variables}
