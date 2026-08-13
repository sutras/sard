---
title: Picker
subtitle: 选择器
group: 表单组件
---

## 介绍

一个或多个可滚动列表选择器。

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `columns` 配置选项数据。

<<< @demo/picker/demo/Basic.vue

### 对象类型

列的每一项可以为一个对象，使用 `optionKeys` 属性可以指定对象中哪个属性值为选中的值，哪个属性值为要显示的标签。

<<< @demo/picker/demo/ObjectOption.vue

### 多列

当 `columns` 属性值为一个二维数组时会显示为多列。

<<< @demo/picker/demo/Multiple.vue

### 对象类型多列

`columns` 属性值为对象类型的二维数组。

<<< @demo/picker/demo/ObjectMultiple.vue

### 级联选择

当 `columns` 第一个元素为对象且其 `children` 属性值为数组时会被当作级联选择。

<<< @demo/picker/demo/Cascaded.vue

### 插槽

可通过 `option` 插槽自定义每一个选项的内容。

<<< @demo/picker/demo/Slot.vue

## API

### PickerProps\<T>

| 属性        | 描述                          | 类型         | 默认值                                                   |
| ----------- | ----------------------------- | ------------ | -------------------------------------------------------- |
| columns     | 配置每一列的数据              | T[] \| T[][] | []                                                       |
| option-keys | 自定义 `columns` 结构中的字段 | OptionKeys   | `{label: 'label', value: 'value', children: 'children'}` |
| model-value | 选中项的值                    | any          | -                                                        |

### PickerSlots\<T>

| 插槽   | 描述             | 属性                                                   |
| ------ | ---------------- | ------------------------------------------------------ |
| option | 自定义选项的内容 | `{ option: T; rowIndex: number; columnIndex: number }` |

### PickerEmits\<T>

| 事件              | 描述                 | 类型                                                            |
| ----------------- | -------------------- | --------------------------------------------------------------- |
| update:modelValue | 选中的选项改变时触发 | `(value: any, selectedOptions: T[], indexes: number[]) => void` |
| change            | 选中的选项改变时触发 | `(value: any, selectedOptions: T[], indexes: number[]) => void` |

### OptionKeys

```tsx
interface OptionKeys {
  label?: string
  value?: string
  children?: string
}
```
