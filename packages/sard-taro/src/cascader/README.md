# Cascader 级联选择

### 介绍

用于在多层级数据中进行选择，常用于省市区、组织架构选择。

### 引入

```js
import { Cascader } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/cascader/demo/Basic.tsx)

### 配合弹出框使用

%(${DEMO_PATH}/cascader/demo/WithPopout.tsx)

### 异步加载

通过监听 `onSelect` 事件，获取当前选中的选项，将异步获取的数据作为 `children` 属性值， 再把组件的 `options` 更新一下，使组件重新渲染。如果选项的 `children` 是需要用户点击时再通过接口获取的， 此选项的 `children` 需初始化为空数组。

%(${DEMO_PATH}/cascader/demo/Async.tsx)

### 自定义选项上方内容

%(${DEMO_PATH}/cascader/demo/OptionTop.tsx)

### 禁选选项

%(${DEMO_PATH}/cascader/demo/Disabled.tsx)

## API

### CascaderProps

| 属性         | 描述                                                    | 类型                                                           | 默认值            |
| ------------ | ------------------------------------------------------- | -------------------------------------------------------------- | ----------------- |
| value        | 指定选中项                                              | any[]                                                          | -                 |
| defaultValue | 默认的选中项                                            | any[]                                                          | -                 |
| options      | 可选项数据源                                            | CascaderOption[]                                               | []                |
| fieldNames   | 自定义 `options` 中 `label`, `value`, `children` 等字段 | CascaderFieldNames                                             | defaultFieldNames |
| placeholder  | 未选中时的提示文案                                      | React.ReactNode                                                | '请选择'          |
| onChange     | 选择完成后时触发                                        | (value: any[], selectedOptions: CascaderOption[]) => void      | -                 |
| onSelect     | 选择后时触发                                            | (option: CascaderOption, columnIndex: number) => void          | -                 |
| labelRender  | 自定义可选项渲染                                        | (option: CascaderOption, selected: boolean) => React.ReactNode | -                 |

### CascaderOption

```ts
export interface CascaderOption {
  label?: React.ReactNode
  value?: any
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

## 主题定制

### CSS 变量

%(./index.scss#variables)
