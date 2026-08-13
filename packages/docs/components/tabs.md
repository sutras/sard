---
title: Tabs
subtitle: 标签页
group: 导航组件
---

## 介绍

选项卡切换组件。

## 代码演示

### 基础使用

通过 `v-model:current` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

<<< @demo/tabs/demo/Basic.vue

### 可滚动标签栏

设置 `scrollable` 后标签不再平分空间，并且可以实现水平滚动。

<<< @demo/tabs/demo/Scrollable.vue

### 禁用标签

禁用的标签无法手动选择。

<<< @demo/tabs/demo/Disabled.vue

### 药丸类型

设置 `type="pill"` 可以让标签显示为药丸风格。

<<< @demo/tabs/demo/Pill.vue

### 卡片类型

设置 `type="card"` 可以让标签显示为卡片风格。

<<< @demo/tabs/demo/Card.vue

### 自定义标签

除了通过 `options` 属性设置标签内容，还可以通过组件的方式自由地渲染任何内容。

<<< @demo/tabs/demo/CustomTab.vue

## API

### TabsProps

| 属性        | 描述                     | 类型                       | 默认值 |
| ----------- | ------------------------ | -------------------------- | ------ |
| model-value | 当前选中的标签的 `value` | unknown                    | -      |
| options     | 标签项数组               | TabProps[]                 | -      |
| type        | 标签类型                 | 'line' \| 'pill' \| 'card' | 'line' |
| scrollable  | 是否可滚动               | boolean                    | false  |

### TabsSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| line    | 自定义线条内容 | -    |

### TabsEmits

| 事件           | 描述                     | 类型                      |
| -------------- | ------------------------ | ------------------------- |
| update:current | 当前激活的标签改变时触发 | `(name: unknown) => void` |
| change         | 当前激活的标签改变时触发 | `(name: unknown) => void` |

### TabProps

| 属性     | 描述         | 类型    | 默认值 |
| -------- | ------------ | ------- | ------ |
| label    | 标签页文本   | string  | -      |
| value    | 标签页值     | unknown | -      |
| disabled | 是否禁用标签 | boolean | false  |

### TabSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TabEmits

| 事件  | 描述                         | 类型                          |
| ----- | ---------------------------- | ----------------------------- |
| click | 点击标签时触发，不论是否禁用 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                          | 值                              |
| --------------------------------- | ------------------------------- |
| `--s-tabs-tab-height`             | `var(--s-content-height)`       |
| `--s-tabs-tab-font-size`          | `var(--s-font-size)`            |
| `--s-tabs-tab-line-height`        | `var(--s-line-height-snug)`     |
| `--s-tabs-tab-color`              | `var(--s-text-color-secondary)` |
| `--s-tabs-tab-color-active`       | `var(--s-text-color-emphasis)`  |
| `--s-tabs-tab-padding-x`          | `var(--s-size)`                 |
| `--s-tabs-pill-tab-height`        | `30px`                          |
| `--s-tabs-pill-tab-bg-current`    | `var(--s-color-primary)`        |
| `--s-tabs-pill-tab-color-current` | `var(--s-white)`                |
| `--s-tabs-card-tab-height`        | `30px`                          |
| `--s-tabs-card-color-primary`     | `var(--s-color-primary)`        |
| `--s-tabs-card-border-radius`     | `var(--s-border-radius)`        |
| `--s-tabs-line-width`             | `40px`                          |
| `--s-tabs-line-height`            | `3px`                           |
| `--s-tabs-line-bg`                | `var(--s-color-primary)`        |
| `--s-tabs-line-duration`          | `var(--s-duration)`             |
