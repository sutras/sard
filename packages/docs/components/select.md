---
title: Select
subtitle: 列表选择
group: 表单组件
---

## 介绍

从列表中选择一个或多个选项。

## 代码演示

### 基础使用

`v-model` 绑定当前被选中的 `SelectOption` 的 `value` 属性值。

<<< @demo/select/demo/Basic.vue

更多案例，请参考 [SelectPopout 组件](./select-popout)。

## API

### SelectProps

| 属性               | 描述                                              | 类型                                                                     | 默认值 |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------ | ------ |
| model-value        | 当前绑定的值                                      | any                                                                      | -      |
| multiple           | 是否允许多选                                      | boolean                                                                  | false  |
| multiple-limit     | 多选时允许最多选择的个数，为0则不限制             | number                                                                   | 0      |
| filterable         | 是否允许筛选                                      | boolean                                                                  | false  |
| filter-placeholder | 筛选输入框的占位文案                              | string                                                                   | -      |
| filter-method      | 允许筛选时的回调                                  | `(query: string) => void`                                                | -      |
| filter-value       | 当前筛选输入框的值                                | string                                                                   | -      |
| remote             | 是否允许远程加载数据                              | boolean                                                                  | false  |
| remote-method      | 允许远程加载数据时的回调                          | `(query: string, page: number, isRefresh: boolean) => Promise\<boolean>` | -      |
| threshold          | 触发远程加载回调的阈值，单位ms                    | number                                                                   | 500    |
| show-toolbar       | 多选时，是否显示工具栏                            | boolean                                                                  | false  |
| options            | 选项的数据                                        | Record<string, any>[]                                                    | []     |
| option-keys        | 自定义 `options` 中的字段                         | OptionKeys                                                               | -      |
| value-key          | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string                                                                   | -      |

### OptionKeys

```tsx
interface OptionKeys {
  label?: string
  value?: string
  children?: string
}
```

### SelectSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SelectEmits

| 事件                | 描述                     | 类型                      |
| ------------------- | ------------------------ | ------------------------- |
| update:modelValue   | 列表选择组件值改变时触发 | `(value: any) => void`    |
| change              | 列表选择组件值改变时触发 | `(value: any) => void`    |
| select              | 选择列表选择组时触发     | `(value: any) => void`    |
| update:filter-value | 筛选框值改变时触发       | `(value: string) => void` |

### SelectOptionGroupProps

| 属性     | 描述                   | 类型             | 默认值 |
| -------- | ---------------------- | ---------------- | ------ |
| label    | 选项组的标签           | string \| number | -      |
| disabled | 是否禁用组内所有的选项 | boolean          | false  |

### SelectOptionGroupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SelectOptionProps

| 属性     | 描述             | 类型                                  | 默认值 |
| -------- | ---------------- | ------------------------------------- | ------ |
| label    | 选项的标签       | string \| number                      | -      |
| value    | 选项的值         | string \| number \| boolean \| object | -      |
| disabled | 是否禁用该选项   | boolean                               | false  |
| plain    | 是否移除默认样式 | boolean                               | false  |

### SelectOptionSlots

| 插槽    | 描述           | 属性                                       |
| ------- | -------------- | ------------------------------------------ |
| default | 自定义默认内容 | `{ disabled: boolean; selected: boolean }` |
| label   | 自定义标签内容 | `{ disabled: boolean; selected: boolean }` |

### SelectOptionEmits

| 事件  | 描述           | 类型                          |
| ----- | -------------- | ----------------------------- |
| click | 点击选项时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                                  | 值                             |
| ----------------------------------------- | ------------------------------ |
| `--s-select-max-height`                   | `320px`                        |
| `--s-select-bg`                           | `var(--s-bg-color-container)`  |
| `--s-select-search-padding-x`             | `var(--s-content-padding-x)`   |
| `--s-select-search-padding-y`             | `var(--s-content-padding-y)`   |
| `--s-select-option-min-height`            | `var(--s-content-height-sm)`   |
| `--s-select-option-padding-x`             | `var(--s-content-padding-x)`   |
| `--s-select-option-padding-y`             | `var(--s-content-padding-y)`   |
| `--s-select-option-bg-active`             | `var(--s-bg-color-active)`     |
| `--s-select-option-opacity-disabled`      | `var(--s-opacity-disabled)`    |
| `--s-select-option-color-selected`        | `var(--s-color-primary)`       |
| `--s-select-option-label-font-size`       | `var(--s-font-size)`           |
| `--s-select-option-group-label-padding-x` | `var(--s-content-padding-x)`   |
| `--s-select-option-group-label-padding-y` | `var(--s-content-padding-y)`   |
| `--s-select-option-group-label-font-size` | `var(--s-font-size-sm)`        |
| `--s-select-option-group-label-color`     | `var(--s-text-color-tertiary)` |
| `--s-select-option-group-label-bg`        | `var(--s-fill-color-fourth)`   |
| `--s-select-toolbar-padding-x`            | `var(--s-content-padding-x)`   |
| `--s-select-toolbar-padding-y`            | `0`                            |
| `--s-select-empty-margin-top`             | `var(--s-size)`                |
