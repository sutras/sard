# Form 表单

### 介绍

用于数据采集，由各种类型的表单域组成，可对数据进行校验、清除、重置、提交等操作。

### 引入

```ts
import { Form } from 'sard'
```

## 代码演示

### Ant Demo

#### 基本使用

基本的表单数据域控制展示，包含布局、初始化、验证、提交。

@code('${DEMO_PATH}/form/ant-demo/Demo1.tsx')

#### 表单方法调用

通过 Form.useForm 对表单数据域进行交互。

@code('${DEMO_PATH}/form/ant-demo/Demo2.tsx')

#### 表单布局

表单有水平和垂直布局。

@code('${DEMO_PATH}/form/ant-demo/Demo3.tsx')

#### 表单只读和禁用

每个内置表单组件都有只读和禁用两种状态。

@code('${DEMO_PATH}/form/ant-demo/Demo4.tsx')

#### 字段监听 Hooks

`useWatch` 允许你监听字段变化，同时仅当该字段变化时重新渲染。

@code('${DEMO_PATH}/form/ant-demo/Demo5.tsx')

#### 仅校验

通过 `validate` 的 `validateOnly` 可以动态调整提交按钮的 `disabled` 状态。

@code('${DEMO_PATH}/form/ant-demo/Demo6.tsx')

#### 字段路径前缀

在某些场景，你希望统一设置一些字段的前缀。你可以通过 `Form.Map` 组件实现该效果。

@code('${DEMO_PATH}/form/ant-demo/Demo7.tsx')

#### 动态增减表单项

动态增加、减少表单项。add 方法参数可用于设置初始值。

@code('${DEMO_PATH}/form/ant-demo/Demo8.tsx')

#### 动态增减嵌套字段

`Form.List` 组件里面嵌套 `Form.Map` 组件可以实现该效果。

@code('${DEMO_PATH}/form/ant-demo/Demo9.tsx')

#### 复杂的动态增减表单项

多个 `Form.List` 嵌套的使用场景。

@code('${DEMO_PATH}/form/ant-demo/Demo10.tsx')

#### 嵌套结构与校验信息

`Form.List`、 `Form.Map` 组件支持嵌套数据结构。通过 `validateMessages` 或 `message` 自定义校验信息模板。

@code('${DEMO_PATH}/form/ant-demo/Demo11.tsx')

#### 复杂一点的控件

这里演示 `Form.Field` 内有多个元素的使用方式。`Form.Field` 只会对它的直接子元素绑定表单功能。如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 `Form.Field` 完成。你可以给 `Form.Field` 自定义 `style` 进行内联布局，或者添加 `unstyled` 作为纯粹的无样式绑定组件。

可以给 `Form.Field` 添加 `inlaid` 属性去掉默认的内边距以及下划线以便可以更好嵌套在 `Form.Field` 中。

单纯去掉下划线可以配置 `underline` 属性。

@code('${DEMO_PATH}/form/ant-demo/Demo12.tsx')

#### 自定义表单控件

自定义或第三方的表单控件，也可以与 `Form` 组件一起使用。只要该组件遵循以下的约定：

- 提供受控属性 `value` 或其它与 `valuePropName` 的值同名的属性。
- 提供 `onChange` 事件或 `trigger` 的值同名的事件。

@code('${DEMO_PATH}/form/ant-demo/Demo13.tsx')

#### 多表单联动

使用 `setValues` 可以设置获取的其他表单验证成功后的表单数据。

@code('${DEMO_PATH}/form/ant-demo/Demo14.tsx')

#### 登录栏

下面代码实现了需要输入帐号密码才允许提交的简单登录栏。

@code('${DEMO_PATH}/form/ant-demo/Demo15.tsx')

#### 复杂一点的登录栏

下面代码实现了一个表单内容稍微多一点的登录栏。

@code('${DEMO_PATH}/form/ant-demo/Demo16.tsx')

#### 注册新用户

用户填写必须的信息以注册新用户。

@code('${DEMO_PATH}/form/ant-demo/Demo17.tsx')

#### 弹出层中的新建表单

当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，可以用 `Dialog` 弹出一个表单，用户填写必要信息后创建新的项。

@code('${DEMO_PATH}/form/ant-demo/Demo18.tsx')

#### 时间类控件

时间类组件的 `value` 类型为 `Date` 对象，所以在提交服务器前需要预处理。

@code('${DEMO_PATH}/form/ant-demo/Demo19.tsx')

#### 自行处理表单数据

`Form` 具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择自行处理数据。

@code('${DEMO_PATH}/form/ant-demo/Demo20.tsx')

#### 自定义校验

我们提供了 `validateStatus`、 `feedback` 等属性，你可以不通过 `Form` 自己定义校验的时机和内容。

- `validateStatus`: 校验状态，可选 `'passed', 'failed', 'unvalidated'`。
- `feedback`: 设置校验文案。

@code('${DEMO_PATH}/form/ant-demo/Demo21.tsx')

#### 动态校验规则

根据不同情况执行不同的校验规则。

@code('${DEMO_PATH}/form/ant-demo/Demo22.tsx')

## API

### FormProps

| 属性                  | 描述                                                                        | 类型                                   | 默认值       |
| --------------------- | --------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| initialValues         | 表单默认值，只有初始化以及重置时生效                                        | Record\<string, any>                   | -            |
| form                  | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建                | FormStore                              | -            |
| layout                | 设置表单项的布局                                                            | 'horizontal' \| 'vertical'             | 'horizontal' |
| labelWidth            | 设置标签宽度                                                                | number \| string                       | -            |
| labelAlign            | 设置标签水平对齐方式                                                        | 'start' \| 'center' \| 'end'           | 'start'      |
| labelValign           | 设置标签垂直对齐方式                                                        | 'start' \| 'center' \| 'end'           | 'start'      |
| starPosition          | 设置必填星号在标签的位置                                                    | 'left' \| 'right'                      | 'left'       |
| disabled              | 禁用表单组件                                                                | boolean                                | false        |
| readOnly              | 使表单组件只读                                                              | boolean                                | false        |
| scrollToFirstError    | 提交失败自动滚动到第一个错误字段                                            | boolean                                | false        |
| scrollIntoViewOptions | 当 `scrollToFirstError` 为真时用于自定义滚动，建议使用 `useMemo` 记忆化处理 | ScrollIntoViewOptions                  | -            |
| validateMessages      | 验证提示模板                                                                | ValidateMessages                       | -            |
| validateTrigger       | 触发规则校验的时机                                                          | string \| string[]                     | 'onChange'   |
| validateFirst         | 是否在某一项校验不通过时停止校验                                            | boolean                                | false        |
| onSuccess             | 提交成功时触发                                                              | (values: Record\<string, any>) => void | -            |
| onFail                | 提交失败时触发                                                              | (errors: ErrorInfo[]) => void          | -            |
| onReset               | 重置时触发                                                                  | () => void                             | -            |

### ErrorInfo

| 属性        | 描述               | 类型                 | 默认值 |
| ----------- | ------------------ | -------------------- | ------ |
| errorFields | 验证错误的字段信息 | FieldErrors[]        | -      |
| values      | 表单值             | Record\<string, any> | -      |

### FieldErrors

| 属性   | 描述         | 类型       | 默认值 |
| ------ | ------------ | ---------- | ------ |
| errors | 错误信息列表 | string[]   | -      |
| name   | 字段路径名   | NodeName[] | -      |

### FormFieldProps

| 属性                | 描述                                                | 类型                         | 默认值           |
| ------------------- | --------------------------------------------------- | ---------------------------- | ---------------- |
| layout              | 设置表单项的布局                                    | 'horizontal' \| 'vertical'   | 'horizontal'     |
| label               | 标签名                                              | React.ReactNode              | -                |
| labelWidth          | 设置标签宽度                                        | number \| string             | -                |
| labelAlign          | 设置标签水平对齐方式                                | 'start' \| 'center' \| 'end' | 'start'          |
| labelValign         | 设置标签垂直对齐方式                                | 'start' \| 'center' \| 'end' | 'start'          |
| starPosition        | 设置必填星号在标签的位置                            | 'left' \| 'right'            | 'left'           |
| required            | 必填样式设置。如不设置，则会根据校验规则自动生成    | boolean                      | false            |
| hidden              | 是否隐藏字段（依然会收集和校验字段）                | boolean                      | false            |
| unstyled            | 是否无样式，仅处理行为                              | boolean                      | false            |
| underline           | 是否显示字段底部边框                                | boolean                      | true             |
| inlaid              | 设置为嵌入样式，会去掉内边距                        | boolean                      | false            |
| name                | 表单项的名称，用于校验、或设置、获取值等操作        | NodeName                     | -                |
| valuePropName       | 子组件值的属性                                      | string                       | 'value'          |
| trigger             | 子组件值改变时的回调名                              | string                       | 'onChange'       |
| initialValue        | 子组件初始值，`Form` 的 `initialValues ` 优先级较高 | any                          | -                |
| getValueFromTrigger | 设置如何从值改变的回调中提取字段值                  | (...args: any[]) => any      | (value) => value |
| disabled            | 禁用表单组件                                        | boolean                      | false            |
| readOnly            | 只读表单组件                                        | boolean                      | false            |
| rules               | 校验规则                                            | Rule[]                       | -                |
| validateFirst       | 是否在某一规则校验不通过时停止校验                  | boolean                      | false            |
| validateTrigger     | 触发规则校验的时机                                  | string \| string[]           | 'onChange'       |
| validateStatus      | 自定义验证状态                                      | ValidateStatus               | -                |
| feedback            | 自定义反馈信息，不设置则根据规则自动生成            | React.ReactNode              | -                |
| extra               | 自定义额外信息                                      | React.ReactNode              | -                |
| watch               | 监听指定字段值的变化，重新渲染组件                  | NamePath[]                   | -                |

### NodeName

```ts
type NodeName = string | number
```

### NamePath

```ts
type NamePath = NodeName | NodeName[]
```

### ValidateStatus

```ts
type ValidateStatus = 'passed' | 'failed' | 'unvalidated'
```

### Rule

```ts
type Rule = RuleConfig | ((form: FormStore) => RuleConfig)
```

### RuleConfig

| 属性       | 描述                                                                             | 类型                                                                             | 默认值   |
| ---------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| validator  | 通过函数来自定义验证                                                             | (value: any, rule: Rule) => Promise\<void> \| boolean \| string                  | -        |
| pattern    | 通过正则来进行校验                                                               | RegExp                                                                           | -        |
| message    | 校验失败的反馈文案                                                               | string \| (() => string)                                                         | -        |
| trigger    | 触发校验的时机                                                                   | 'onBlur' \| 'onChange' \| 'onSubmit' \| ('onBlur' \| 'onChange' \| 'onSubmit')[] | -        |
| transform  | 将值转换后再进行校验                                                             | (value: any, rule: Rule) => any                                                  | -        |
| required   | 是否为必选字段，当值为空值时 `'', [], false, undefined, null`，校验不通过        | boolean                                                                          | false    |
| type       | 使用内置的校验规则                                                               | ValidatorType                                                                    | 'string' |
| enum       | 是否匹配枚举中的值（需要将 type 设置为 enum）                                    | any[]                                                                            | -        |
| len        | 当 `type` 为字符串（字符串长度）、数值（等于数值）、数组（数组长度）时有效       | number                                                                           | -        |
| min        | 当 `type` 为字符串（字符串最小长度）、数值（最小值）、数组（数组最小长度）时有效 | number                                                                           | -        |
| max        | 当 `type` 为字符串（字符串最大长度）、数值（最大值）、数组（数组最大长度）时有效 | number                                                                           | -        |
| whitespace | `type` 为 `'string'` 时，如果字段仅包含空格则校验不通过                          | boolean                                                                          | false    |

#### RuleConfig['validator']说明

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

| 属性         | 描述                           | 类型                                      | 默认值    |
| ------------ | ------------------------------ | ----------------------------------------- | --------- |
| behavior     | 定义滚动是立即的还是平滑的动画 | 'smooth' \| 'instant'                     | 'instant' |
| block        | 定义垂直方向的对齐             | 'start' \| 'center' \| 'end' \| 'nearest' | 'start'   |
| offsetTop    | 元素距离页面顶部的距离         | number                                    | 10        |
| offsetBottom | 元素距离页面底部的距离         | number                                    | 0         |

### FormListProps

| 属性            | 描述                                                  | 类型                                                                                            | 默认值     |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| children        | 列表节点内容                                          | (fields: FormListField[], operation: FormListOperations, meta: FormListMeta) => React.ReactNode | -          |
| name            | 列表节点的名称，用于校验、或设置、获取值等操作        | NodeName                                                                                        | -          |
| initialValue    | 列表节点初始值，`Form` 的 `initialValues ` 优先级较高 | any[]                                                                                           | -          |
| rules           | 校验规则                                              | Rule[]                                                                                          | -          |
| validateFirst   | 是否在某一规则校验不通过时停止校验                    | boolean                                                                                         | false      |
| validateTrigger | 触发规则校验的时机                                    | string \| string[]                                                                              | 'onChange' |
| validateStatus  | 自定义验证状态                                        | ValidateStatus                                                                                  | -          |
| watch           | 监听指定字段值的变化，重新渲染组件                    | NamePath[]                                                                                      | -          |

### FormListField

| 属性 | 描述              | 类型   | 默认值 |
| ---- | ----------------- | ------ | ------ |
| key  | 列表项的唯一`key` | number | -      |
| name | 列表项的名称      | number | -      |

### FormListOperations

| 属性   | 描述       | 类型                                               | 默认值 |
| ------ | ---------- | -------------------------------------------------- | ------ |
| add    | 新增表单项 | (defaultValue?: any, insertIndex?: number) => void | -      |
| move   | 移动表单项 | (from: number, to: number) => void                 | -      |
| remove | 删除表单项 | (index: number \| number[]) => void                | -      |

### FormListMeta

| 属性           | 描述         | 类型           | 默认值 |
| -------------- | ------------ | -------------- | ------ |
| errors         | 错误信息列表 | string[]       | -      |
| required       | 是否必须     | boolean        | -      |
| validateStatus | 验证状态     | ValidateStatus | -      |

### FormMapProps

| 属性            | 描述                                                  | 类型                 | 默认值     |
| --------------- | ----------------------------------------------------- | -------------------- | ---------- |
| children        | 映射节点内容                                          | React.ReactNode      | -          |
| name            | 映射节点的名称，用于校验、或设置、获取值等操作        | NodeName             | -          |
| initialValue    | 映射节点初始值，`Form` 的 `initialValues ` 优先级较高 | Record\<string, any> | -          |
| rules           | 校验规则                                              | Rule[]               | -          |
| validateFirst   | 是否在某一规则校验不通过时停止校验                    | boolean              | false      |
| validateTrigger | 触发规则校验的时机                                    | string \| string[]   | 'onChange' |
| validateStatus  | 自定义验证状态                                        | ValidateStatus       | -          |
| watch           | 监听指定字段值的变化，重新渲染组件                    | NamePath[]           | -          |

### FormStore

| 属性          | 描述                                       | 类型                                                                               | 默认值 |
| ------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- | ------ |
| getError      | 获取某个节点的错误信息                     | (name: NamePath) => string[]                                                       | -      |
| getErrors     | 返回所有或一组节点的错误信息               | (name?: NamePath[]) => FieldErrors[]                                               | -      |
| getValue      | 获取某个节点的值                           | (name: NamePath) => any                                                            | -      |
| getValues     | 获取所有或一组节点对应的值                 | (name?: NamePath[]) => any                                                         | -      |
| scrollToField | 滚动到指定字段位置                         | (name: NamePath, options?: ScrollIntoViewOptions) => void                          | -      |
| setNodeData   | 设置一组字段状态                           | (data: NodeData[]) => void                                                         | -      |
| setValues     | 设置表单的值                               | (values: any) => void                                                              | -      |
| setValue      | 设置指定节点的值                           | (name: NamePath, value: any) => void                                               | -      |
| validate      | 验证指定的字段，不传递字段名则验证所有字段 | (name?: NamePath[] \| ValidateOptions, options?: ValidateOptions) => Promise\<any> | -      |
| submit        | 提交表单，与点击 submit 按钮效果相同       | () => Promise\<void>                                                               | -      |
| reset         | 重置一组节点到初始值                       | (name?: NamePath[]) => void                                                        | -      |

### useForm

```ts
function useForm(form?: FormStore): [FormStore]
```

创建 `FormStore` 实例，用于管理所有数据状态。

### useWatch

```ts
function useWatch(name: NamePath | [], form?: FormStore): any
```

用于直接获取 form 中字段对应的值。

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
