---
title: Switch
subtitle: 开关
group: 表单组件
---

## 介绍

用于打开/关闭两种状态间的切换。

## 代码演示

### 基础使用

通过 `v-model` 绑定开关的状态，`true` 表示开，`false` 表示关。

<<< @demo/switch/demo/Basic.vue

### 自定义尺寸

使用 `size` 属性设置开关尺寸。

<<< @demo/switch/demo/Size.vue

### 自定义颜色

使用 `checkedColor` 属性设置打开时的颜色，使用 `uncheckedColor` 属性设置关闭时的颜色。

<<< @demo/switch/demo/Color.vue

### 不同状态的值

可以设置 `checkedValue` 和 `uncheckedValue` 属性代替默认的 `true` 和 `false`。

<<< @demo/switch/demo/Value.vue

### 只读和禁用

只读或禁用时不可操作。

<<< @demo/switch/demo/DisabledReadOnly.vue

### 加载状态

当提供 `beforeUpdate` 函数，会在 `fulfilled` 状态后才切换，期间显示加载状态。

<<< @demo/switch/demo/Loading.vue

### 带有文字

可以使用 `checked-text` 和 `unchecked-text` 属性设置开关内的文字。

<<< @demo/switch/demo/Text.vue

### 使用插槽自定义内容

如果需要在开关内部展示复杂的内容，也可以使用 `checked-text` 和 `unchecked-text` 插槽。

<<< @demo/switch/demo/Slots.vue

## API

### SwitchProps

| 属性            | 描述               | 类型                            | 默认值 |
| --------------- | ------------------ | ------------------------------- | ------ |
| model-value     | 开关状态           | any                             | -      |
| disabled        | 禁用状态           | boolean                         | false  |
| readonly        | 只读状态           | boolean                         | false  |
| loading         | 加载状态           | boolean                         | -      |
| size            | 开关大小           | string                          | -      |
| checked-color   | 打开时的颜色       | string                          | -      |
| unchecked-color | 关闭时的颜色       | string                          | -      |
| checked-value   | 打开时的值         | any                             | true   |
| unchecked-value | 关闭时的值         | any                             | false  |
| checked-text    | 打开时的展示的文字 | string                          | -      |
| unchecked-text  | 关闭时的展示的文字 | string                          | -      |
| before-update   | 用于异步切换       | `(value: any) => Promise\<any>` | -      |
| validate-event  | 是否触发表单验证   | boolean                         | true   |

### SwitchSlots

| 插槽           | 描述               | 属性 |
| -------------- | ------------------ | ---- |
| checked-text   | 自定义打开时的内容 | -    |
| unchecked-text | 自定义关闭时的内容 | -    |

### SwitchEmits

| 事件              | 描述                                   | 类型                          |
| ----------------- | -------------------------------------- | ----------------------------- |
| click             | 点击按钮时触发，加载和禁用状态不会触发 | `(event: MouseEvent) => void` |
| update:modelValue | 开关状态切换时触发                     | `(value: any) => void`        |
| change            | 开关状态切换时触发                     | `(value: any) => void`        |
| update:loading    | 加载状态切换时触发                     | `(loading: boolean) => void`  |

## 主题定制

### 样式变量

| CSS 变量                     | 值                                                                    |
| ---------------------------- | --------------------------------------------------------------------- |
| `--s-switch-size`            | `30px`                                                                |
| `--s-switch-width`           | `calc(var(--s-switch-size) / 6 * 10)`                                 |
| `--s-switch-height`          | `var(--s-switch-size)`                                                |
| `--s-switch-bg`              | `var(--s-fill-color-secondary)`                                       |
| `--s-switch-bg-checked`      | `var(--s-color-primary)`                                              |
| `--s-switch-opacity-loading` | `var(--s-opacity-loading)`                                            |
| `--s-switch-thumb-gap`       | `3px`                                                                 |
| `--s-switch-thumb-width`     | `calc(var(--s-switch-height) - var(--s-switch-thumb-gap) * 2)`        |
| `--s-switch-thumb-height`    | `var(--s-switch-thumb-width)`                                         |
| `--s-switch-thumb-radius`    | `var(--s-border-radius-full)`                                         |
| `--s-switch-thumb-bg`        | `var(--s-white)`                                                      |
| `--s-switch-thumb-color`     | `var(--s-gray-600)`                                                   |
| `--s-switch-text-min-margin` | `9px`                                                                 |
| `--s-switch-text-max-margin` | `calc(var(--s-switch-thumb-width) + var(--s-switch-text-min-margin))` |
| `--s-switch-text-color`      | `var(--s-white)`                                                      |
| `--s-switch-text-font-size`  | `var(--s-font-size)`                                                  |
