# Cascader 级联选择

### 介绍

用于在多层级数据中进行选择，常用于省市区、组织架构选择。

### 引入

```ts
import { Cascader } from 'sard'
```

## 代码演示

### 基础使用

级联选择组件通常配合 `PopoutInput` 组件一起使用，可以控制弹出框的显隐以及格式化输出当前值。

@code('${DEMO_PATH}/cascader/demo/Basic.tsx')

### 异步加载

通过监听 `onSelect` 事件，获取当前选中的选项，将异步获取的数据作为 `children` 属性值， 再把组件的 `options` 更新一下，使组件重新渲染。如果选项的 `children` 是需要用户点击时再通过接口获取的， 此选项的 `children` 需初始化为空数组。

@code('${DEMO_PATH}/cascader/demo/Async.tsx')

### 自定义面板上方内容

使用 `optionTop` 属性可以在面板顶部展示当前面板的一些信息。

@code('${DEMO_PATH}/cascader/demo/OptionTop.tsx')

### 禁选选项

禁用的选项不可点击。

@code('${DEMO_PATH}/cascader/demo/Disabled.tsx')

## API

### CascaderProps

| 属性            | 描述                                                                                                             | 类型                                                                   | 默认值            |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------- |
| value           | 指定选中项                                                                                                       | string \| number                                                       | -                 |
| defaultValue    | 默认的选中项                                                                                                     | string \| number                                                       | -                 |
| onChange        | 选择完成后时触发                                                                                                 | (value: string \| number, selectedOptions: CascaderOption[]) => void   | -                 |
| options         | 可选项数据源                                                                                                     | CascaderOption[]                                                       | []                |
| fieldNames      | 自定义 `options` 中 `label`, `value`, `children` 等字段                                                          | CascaderFieldNames                                                     | defaultFieldNames |
| placeholder     | 未选中时的提示文案                                                                                               | React.ReactNode                                                        | '请选择'          |
| onSelect        | 选择后时触发                                                                                                     | (option: CascaderOption, columnIndex: number) => void                  | -                 |
| labelRender     | 自定义可选项渲染                                                                                                 | (option: CascaderOption, selected: boolean \| null) => React.ReactNode | -                 |
| optionTop       | 自定义面板上方内容                                                                                               | React.ReactNode \| ((tabIndex: number) => React.ReactNode)             | -                 |
| optionBottom    | 自定义面板下方内容                                                                                               | React.ReactNode \| ((tabIndex: number) => React.ReactNode)             | -                 |
| withPopout      | 是否配合弹出框一起使用。组件内部只把要渲染的元素放在弹出框而不是整个日历组件可在弹出框隐藏时保留日历组件的状态。 | boolean                                                                | false             |
| popoutProps     | `Popout` 组件的 `props`                                                                                          | PopoutProps                                                            | -                 |
| outletFormatter | 配合 `PopoutInput` 使用时自定义格式化输出要展示的数据                                                            | (labels: string[]) => string                                           | -                 |

### CascaderOption

```ts
interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
}
```

### CascaderFieldNames

```ts
interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}
```

### defaultFieldNames

```ts
const defaultFieldNames: CascaderFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}
```

### Cascader 类方法

| 方法                   | 描述                                                        | 类型                                                      |
| ---------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| outletFormatter        | 根据 `props` 和当前值获取要展示的预备数据，并将其格式化输出 | (props: CascaderProps, value: string \| number) => string |
| defaultOutletFormatter | 默认的格式化要展示的预备数据的函数                          | (labels: (string \| number)[]) => string                  |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
