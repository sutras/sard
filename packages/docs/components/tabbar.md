---
title: Tabbar
subtitle: 标签栏
group: 导航组件
---

## 介绍

固定在页面底部的导航栏，用于切换不同的页面。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前选中的标签。

<<< @demo/tabbar/demo/Basic.vue

### 自定义图标

通过 `icon` 属性自定义图标。

<<< @demo/tabbar/demo/Icon.vue

### 自定义颜色

使用 `color` 属性设置未选中标签的颜色。
使用 `activeColor` 属性设置选中标签的颜色。

<<< @demo/tabbar/demo/Color.vue

### 徽标

可以使用 `Badge` 组件包裹图标。

<<< @demo/tabbar/demo/Badge.vue

### 中间鼓起

通过覆盖默认插槽自定义标签结构和样式。

<<< @demo/tabbar/demo/Bulge.vue

## API

### TabbarProps

| 属性                   | 描述                        | 类型             | 默认值 |
| ---------------------- | --------------------------- | ---------------- | ------ |
| model-value            | 当前选中标签的 `value` 属性 | number \| string | -      |
| color                  | 未选中标签的颜色            | string           | -      |
| active-color           | 选中标签的颜色              | string           | -      |
| bordered               | 是否显示外边框              | boolean          | true   |
| fixed                  | 是否固定到页面底部          | boolean          | false  |
| safe-area-inset-bottom | 是否开启底部安全区适配      | boolean          | false  |

### TabbarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TabbarEmits

| 事件              | 描述           | 类型                                |
| ----------------- | -------------- | ----------------------------------- |
| update:modelValue | 切换标签时触发 | `(value: number \| string) => void` |
| change            | 切换标签时触发 | `(value: number \| string) => void` |

### TabbarItemProps

| 属性  | 描述             | 类型             | 默认值 |
| ----- | ---------------- | ---------------- | ------ |
| value | 标签唯一标识符   | string \| number | -      |
| label | 要显示的标签文本 | string           | -      |

### TabbarItemSlots

| 插槽    | 描述           | 属性                |
| ------- | -------------- | ------------------- |
| default | 自定义文本内容 | -                   |
| icon    | 自定义图标     | `{active: boolean}` |

### TabbarItemEmits

| 事件  | 描述           | 类型                          |
| ----- | -------------- | ----------------------------- |
| click | 点击标签时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                             | 值                              |
| ------------------------------------ | ------------------------------- |
| `--s-tabbar-z-index`                 | `var(--s-z-index-secondary)`    |
| `--s-tabbar-height`                  | `50px`                          |
| `--s-tabbar-border-color`            | `var(--s-border-color)`         |
| `--s-tabbar-bg`                      | `var(--s-bg-color-container)`   |
| `--s-tabbar-color`                   | `var(--s-text-color-secondary)` |
| `--s-tabbar-item-color-active`       | `var(--s-color-primary)`        |
| `--s-tabbar-item-icon-margin-bottom` | `var(--s-size-2xs)`             |
| `--s-tabbar-item-icon-font-size`     | `var(--s-size-lg)`              |
| `--s-tabbar-item-label-font-size`    | `var(--s-font-size-sm)`         |
