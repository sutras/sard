# Picker 选择器

### 介绍

一个或多个可滚动列表选择器。

### 引入

```ts
import { Picker } from 'sard-taro'
```

## 代码演示

### 基础使用

`Picker` 组件通常配合 `PopoutInput` 组件一起使用，可以控制弹出框的显隐以及格式化输出当前值。

%(${DEMO_PATH}/datetime-picker/demo/Basic.tsx)

### 对象类型

列的每一项可以为一个对象，使用 `optionKeys` 属性可以指定对象中哪个属性值为选中的值，哪个属性值为要显示的标签。

%(${DEMO_PATH}/picker/demo/ObjectOption.tsx)

### 多列

当 `columns` 属性值为一个二维数组时会显示为多列。

%(${DEMO_PATH}/picker/demo/Multiple.tsx)

### 对象类型多列

`columns` 属性值为对象类型的二维数组。

%(${DEMO_PATH}/picker/demo/ObjectMultiple.tsx)

### 级联选择

当 `columns` 第一个元素为对象且其 `children` 属性值为数组时会被当作级联选择。

%(${DEMO_PATH}/picker/demo/Cascaded.tsx)

### 预约时间

下面是使用 `Picker` 实现的预约时间案例。允许选择未来一个月内的工作日和工作时间内的日期时间。

%(${DEMO_PATH}/picker/demo/Appointment.tsx)

### 单独使用

除了配合 `PopoutInput` 组件一起使用外，也可以单独使用。

%(${DEMO_PATH}/picker/demo/Alone.tsx)

## API

### PickerProps

| 属性            | 描述                                                                                       | 类型                                                                           | 默认值                                                 |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| columns         | 配置每一列的数据                                                                           | PickerOption[] \| PickerOption[][]                                             | []                                                     |
| optionKeys      | 自定义 `columns` 结构中的字段                                                              | PickerOptionKeys                                                               | {label: 'label', value: 'value', children: 'children'} |
| value           | 选中项的值                                                                                 | any                                                                            | -                                                      |
| defaultValue    | 默认选中项的值                                                                             | any                                                                            | -                                                      |
| onChange        | 选中项改变时触发                                                                           | (value: any, selectedOptions: PickerOption[], selectedIndex: number[]) => void | -                                                      |
| withPopout      | 是否配合弹出框一起使用。组件内部仅把要渲染的元素放在弹出框可在弹出框隐藏时保留组件的状态。 | boolean                                                                        | false                                                  |
| popoutProps     | `Popout` 组件的 `props`                                                                    | PopoutProps                                                                    | -                                                      |
| outletFormatter | 配合 `PopoutInput` 使用时自定义格式化输出要展示的数据                                      | (props: PickerProps, value: any) => string                                     | -                                                      |

### PickerOption

```tsx
type PickerOption =
  | {
      label?: string | number
      value?: string | number
      children?: PickerOption[]
      [key: PropertyKey]: any
    }
  | number
  | string
```

### PickerOptionKeys

```tsx
interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}
```

### PickerRef

| 属性             | 描述       | 类型      |
| ---------------- | ---------- | --------- |
| getValueForcibly | 获取当前值 | () => any |

### Picker 类方法

| 方法                   | 描述                                                        | 类型                                       |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| outletFormatter        | 根据 `props` 和当前值获取要展示的预备数据，并将其格式化输出 | (props: PickerProps, value: any) => string |
| defaultOutletFormatter | 默认的格式化要展示的预备数据的函数                          | (labels: (string \| number)[]) => string   |

## 主题定制

### CSS 变量

%(./index.scss#variables)
