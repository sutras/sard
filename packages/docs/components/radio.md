---
title: Radio
subtitle: 单选按钮
group: 表单组件
---

## 介绍

在一组可选项中进行单一选择。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前选中值。

<<< @demo/radio/demo/Basic.vue

### 排列方向

将 `direction` 属性设置为 `horizontal` 后，单选按钮组会变成水平排列。

<<< @demo/radio/demo/Direction.vue

### 只读和禁用

只读或禁用后不可点击。

<<< @demo/radio/demo/DisabledReadOnly.vue

### 图标大小

使用 `size` 属性设置图标大小。

<<< @demo/radio/demo/Size.vue

### 图标颜色

使用 `checked-color` 属性设置选中时的图标颜色。

<<< @demo/radio/demo/Color.vue

### 图标类型

设置 `type` 属性为 `record` 可以使图标变为圆点类型。

<<< @demo/radio/demo/Type.vue

### 自定义图标

如果内置的图标不满足需求，可以使用 `icon` 插槽设置为任意的图标。
插槽接收`checked`属性表示当前的选中状态。

<<< @demo/radio/demo/Icon.vue

### 自动渲染单选按钮

使用 `options` 属性设置可选项。

<<< @demo/radio/demo/GroupOptions.vue

### 自定义 UI

如果只想使用单选的逻辑，并想自定义 UI，可以使用单选按钮组的 `custom` 插槽。

这个插槽接收 `toggle`方法和 `value` 属性作为参数。`toggle` 用于选中指定的选项，`value` 用于判断选中状态。

<<< @demo/radio/demo/Custom1.vue

结合 `list` 组件使用：

<<< @demo/radio/demo/Custom2.vue

单选按钮组里面 `radio` 组件，会自动判断选中状态；可以给 `radio` 组件添加 `readonly` 属性以便将点击操作交给其他组件。

<<< @demo/radio/demo/Custom3.vue

## API

### RadioProps

| 属性          | 描述                                 | 类型                 | 默认值   |
| ------------- | ------------------------------------ | -------------------- | -------- |
| checked       | 是否选中                             | boolean              | false    |
| value         | 单选按钮的值，配合单选按钮组一起使用 | any                  | -        |
| label         | 单选按钮标签                         | string               | -        |
| disabled      | 禁用状态                             | boolean              | -        |
| readonly      | 只读状态                             | boolean              | -        |
| size          | 图标的尺寸                           | string               | -        |
| type          | 图标类型                             | 'circle' \| 'record' | 'circle' |
| checked-color | 选中时图标的颜色                     | string               | -        |

### RadioSlots

| 插槽    | 描述           | 属性                   |
| ------- | -------------- | ---------------------- |
| default | 自定义默认内容 | -                      |
| icon    | 自定义图标     | `{ checked: boolean }` |

### RadioEmits

| 事件  | 描述       | 类型                          |
| ----- | ---------- | ----------------------------- |
| click | 点击时触发 | `(event: MouseEvent) => void` |

### RadioGroupProps

| 属性           | 描述                                  | 类型                       | 默认值                             |
| -------------- | ------------------------------------- | -------------------------- | ---------------------------------- |
| model-value    | 指定选中的选项                        | any                        | -                                  |
| disabled       | 禁用状态                              | boolean                    | -                                  |
| readonly       | 只读状态                              | boolean                    | -                                  |
| size           | 图标的尺寸                            | string                     | -                                  |
| type           | 图标类型                              | 'circle' \| 'record'       | 'circle'                           |
| checked-color  | 选中时图标的颜色                      | string                     | -                                  |
| direction      | 排列方向                              | 'horizontal' \| 'vertical' | 'vertical'                         |
| validate-event | 是否触发表单验证                      | boolean                    | true                               |
| options        | 自动设置单选按钮                      | RadioGroupOption[]         | -                                  |
| option-keys    | 自定义 options 的 label、value 的字段 | OptionKeys                 | `{label: 'label', value: 'value'}` |

### RadioGroupOption

```ts
export type RadioGroupOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean
```

### OptionKeys

```ts
export interface OptionKeys {
  label?: string
  value?: string
}
```

### RadioGroupSlots

| 插槽    | 描述                                                         | 属性                                           |
| ------- | ------------------------------------------------------------ | ---------------------------------------------- |
| default | 除了使用默认组件的默认行为，也可以使用自定义组件的自定义行为 | `{ toggle: (value: any) => void, value: any }` |

### RadioGroupEmits

| 事件              | 描述                   | 类型                   |
| ----------------- | ---------------------- | ---------------------- |
| update:modelValue | 单选按钮组值改变时触发 | `(value: any) => void` |
| change            | 单选按钮组值改变时触发 | `(value: any) => void` |

## 主题定制

### 样式变量

| CSS 变量                        | 值                             |
| ------------------------------- | ------------------------------ |
| `--s-radio-group-column-gap`    | `var(--s-size-sm)`             |
| `--s-radio-group-row-gap`       | `var(--s-size-xs)`             |
| `--s-radio-icon-font-size`      | `20px`                         |
| `--s-radio-icon-color`          | `var(--s-text-color-fourth)`   |
| `--s-radio-icon-color-checked`  | `var(--s-color-primary)`       |
| `--s-radio-icon-color-disabled` | `var(--s-text-color-disabled)` |
| `--s-radio-label-margin-start`  | `var(--s-size-xs)`             |
