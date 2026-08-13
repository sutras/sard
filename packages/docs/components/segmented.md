---
title: Segmented
subtitle: 分段控制器
group: 表单组件
---

## 介绍

用于展示多个选项并允许用户选择其中单个选项。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `options` 定义选项内容。

<<< @demo/segmented/demo/Basic.vue

### 尺寸

通过 `size` 属性来定义尺寸大小。

<<< @demo/segmented/demo/Size.vue

### 胶囊形状

使用 `shape="round"` 属性可定义胶囊形状。

<<< @demo/segmented/demo/Shape.vue

### 自定义内容

如果需要自定义内容，可使用 `segmented-item` 组件，需自定义循环和传递 `value` 属性。`options` 属性也需要传递，以便获取当前值的下标。

<<< @demo/segmented/demo/Custom.vue

### 图标排列

此案例演示垂直方向的图标排列。

<<< @demo/segmented/demo/Icon.vue

### 只设置图标

只设置图标看起来会更清爽。

<<< @demo/segmented/demo/OnlyIcon.vue

### 垂直方向

设置 `direction="vertical"` 属性可垂直排列分段器。

<<< @demo/segmented/demo/Direction.vue

### 禁用

可在 `segmented` 上设置 `disabled` 禁用所有选项，或者在选项上设置 `disabled` 禁用单个选项。

如果置于表单组件中，也受表单组件 `disabled` 属性的影响。

<<< @demo/segmented/demo/Disabled.vue

## API

### SegmentedProps

| 属性           | 描述                                  | 类型                           | 默认值                             |
| -------------- | ------------------------------------- | ------------------------------ | ---------------------------------- |
| model-value    | 绑定值                                | any                            | -                                  |
| disabled       | 是否禁用                              | boolean                        | false                              |
| readonly       | 是否只读                              | boolean                        | false                              |
| size           | 组件大小                              | 'small' \| 'medium' \| 'large' | 'medium'                           |
| direction      | 展示的方向                            | 'horizontal' \| 'vertical'     | 'horizontal'                       |
| shape          | 形状                                  | 'square' \| 'round'            | 'square'                           |
| options        | 选项的数据                            | SegmentedOption[]              | -                                  |
| option-keys    | 自定义 options 的 label、value 的字段 | OptionKeys                     | `{label: 'label', value: 'value'}` |
| validate-event | 是否触发表单验证                      | boolean                        | true                               |
| ellipsis       | 溢出时是否显示省略号                  | boolean                        | true                               |

### SegmentedOption

```ts
type SegmentedOption =
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

### SegmentedSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SegmentedEmits

| 事件              | 描述               | 类型                   |
| ----------------- | ------------------ | ---------------------- |
| update:modelValue | 当所选值更改时触发 | `(value: any) => void` |
| change            | 当所选值更改时触发 | `(value: any) => void` |

### SegmentedItemProps

| 属性     | 描述         | 类型                        | 默认值 |
| -------- | ------------ | --------------------------- | ------ |
| label    | 展示文本     | string \| number            | -      |
| value    | 用于绑定的值 | string \| number \| boolean | -      |
| disabled | 禁用状态     | boolean                     | false  |
| readonly | 只读状态     | boolean                     | false  |

### SegmentedItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                           | 值                              |
| ---------------------------------- | ------------------------------- |
| `--s-segmented-min-height-sm`      | `var(--s-content-height-2xs)`   |
| `--s-segmented-min-height`         | `var(--s-content-height-xs)`    |
| `--s-segmented-min-height-lg`      | `var(--s-content-height-sm)`    |
| `--s-segmented-padding`            | `var(--s-size-3xs)`             |
| `--s-segmented-font-size`          | `var(--s-font-size)`            |
| `--s-segmented-bg`                 | `var(--s-fill-color-secondary)` |
| `--s-segmented-border-radius`      | `var(--s-border-radius)`        |
| `--s-segmented-pointer-bg`         | `var(--s-bg-color-container)`   |
| `--s-segmented-pointer-box-shadow` | `var(--s-box-shadow-tertiary)`  |
| `--s-segmented-item-padding`       | `var(--s-size-sm)`              |
| `--s-segmented-item-padding-sm`    | `var(--s-size-xs)`              |
| `--s-segmented-item-color`         | `var(--s-text-color-secondary)` |
| `--s-segmented-item-color-active`  | `var(--s-text-color-emphasis)`  |
| `--s-segmented-item-bg-active`     | `var(--s-bg-color-active-dark)` |
