---
title: PickerView
subtitle: 滚动选择器
group: 表单组件
---

## 介绍

滚动选择器，通常配合 `PickerViewColumn` 子组件使用，实现单列或多列的滚动选择功能。底层组件，一般直接使用 [Picker](./picker) 组件即可。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前选中的索引值，配合 `PickerViewColumn` 子组件使用。

<<< @demo/picker-view/demo/Basic.vue

### 多列选择

可以在 `PickerView` 中放置多个 `PickerViewColumn` 实现多列选择。

<<< @demo/picker-view/demo/Multiple.vue

### 自定义指示器样式

通过 `indicator-style` 和 `indicator-class` 属性自定义指示器样式，通过 `mask-style` 和 `mask-class` 自定义遮罩样式。

<<< @demo/picker-view/demo/CustomStyle.vue

## API

### PickerViewProps

| 属性            | 描述             | 类型     | 默认值 |
| --------------- | ---------------- | -------- | ------ |
| value           | 选中项的索引数组 | number[] | []     |
| indicator-style | 指示器样式       | string   | -      |
| indicator-class | 指示器类名       | string   | -      |
| mask-style      | 遮罩层样式       | string   | -      |
| mask-class      | 遮罩层类名       | string   | -      |

### PickerViewEmits

| 事件         | 描述             | 类型                        |
| ------------ | ---------------- | --------------------------- |
| update:value | 选中项改变时触发 | `(value: number[]) => void` |
| change       | 选中项改变时触发 | `(value: number[]) => void` |

### PickerViewSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### PickerViewColumnProps

`PickerViewColumn` 组件无特定属性。

### PickerViewColumnSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义选项内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                                 | 值                                                                                                                                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--s-picker-view-height`                 | `240px`                                                                                                                                                                                                                             |
| `--s-picker-view-font-size`              | `var(--s-font-size-lg)`                                                                                                                                                                                                             |
| `--s-picker-view-color`                  | `var(--s-text-color-primary)`                                                                                                                                                                                                       |
| `--s-picker-view-indicator-height`       | `var(--s-content-height-lg)`                                                                                                                                                                                                        |
| `--s-picker-view-indicator-border-color` | `var(--s-border-color)`                                                                                                                                                                                                             |
| `--s-picker-view-mask-bg-image`          | `linear-gradient(to bottom, rgba(var(--s-bg-color-elevated-rgb), 0.95), rgba(var(--s-bg-color-elevated-rgb), 0.6)), linear-gradient(to top, rgba(var(--s-bg-color-elevated-rgb), 0.95), rgba(var(--s-bg-color-elevated-rgb), 0.6))` |
