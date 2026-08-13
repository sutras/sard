---
title: Card
subtitle: 卡片
group: 数据展示
---

## 介绍

以矩形的形式呈现相关信息或内容，包含标题、内容和相关元素。

## 代码演示

### 基础使用

展示带标题和内容的卡片。

<<< @demo/card/demo/Basic.vue

### 只有主体

如果不设置标题和额外内容，则不会渲染头部。

<<< @demo/card/demo/OnlyBody.vue

### 底部

可以设置 `footer` 属性在主体下面放置内容。

<<< @demo/card/demo/Footer.vue

### 可点击的

设置 `hover` 属性会有点击状态。

<<< @demo/card/demo/Hover.vue

### 自定义样式

可以通过 css 变量自定义卡片样式。

<<< @demo/card/demo/Style.vue

### 折叠

可使用 `collapsed` 属性设置卡片折叠，折叠时将隐藏主体和底部，只显示头部。

<<< @demo/card/demo/Collapsed.vue

## API

### CardProps

| 属性               | 描述             | 类型    | 默认值 |
| ------------------ | ---------------- | ------- | ------ |
| title              | 头部左边内容     | string  | -      |
| extra              | 头部右边内容     | string  | -      |
| footer             | 底部内容         | string  | -      |
| hover              | 是否开启点击反馈 | boolean | false  |
| hide-header-border | 是否隐藏头部边框 | boolean | false  |
| hide-footer-border | 是否隐藏底部边框 | boolean | false  |
| collapsible        | 是否可折叠       | boolean | false  |
| collapsed          | 是否折叠         | boolean | false  |

### CardSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标内容 | -    |
| title   | 自定义标题内容 | -    |
| extra   | 自定义额外内容 | -    |
| arrow   | 自定义箭头内容 | -    |
| footer  | 自定义底部内容 | -    |

### CardEmits

| 事件             | 描述               | 类型                           |
| ---------------- | ------------------ | ------------------------------ |
| click            | 点击卡片时触发     | `(event: MouseEvent) => void`  |
| update:collapsed | 点击折叠按钮时触发 | `(collapsed: boolean) => void` |

## 主题定制

### 样式变量

| CSS 变量                       | 值                            |
| ------------------------------ | ----------------------------- |
| `--s-card-border-radius`       | `var(--s-border-radius-lg)`   |
| `--s-card-bg`                  | `var(--s-bg-color-container)` |
| `--s-card-bg-active`           | `var(--s-bg-color-active)`    |
| `--s-card-icon-padding-y`      | `var(--s-size-sm)`            |
| `--s-card-icon-padding-x`      | `var(--s-size)`               |
| `--s-card-header-padding-y`    | `var(--s-size-sm)`            |
| `--s-card-header-padding-x`    | `var(--s-size)`               |
| `--s-card-title-font-size`     | `var(--s-font-size-lg)`       |
| `--s-card-body-padding-y`      | `var(--s-size-sm)`            |
| `--s-card-body-padding-x`      | `var(--s-size)`               |
| `--s-card-footer-padding-y`    | `var(--s-size-sm)`            |
| `--s-card-footer-padding-x`    | `var(--s-size)`               |
| `--s-card-border-color`        | `var(--s-border-color)`       |
| `--s-card-border-style`        | `var(--s-border-style)`       |
| `--s-card-border-width`        | `var(--s-border-width)`       |
| `--s-card-border-left`         | `0px`                         |
| `--s-card-border-right`        | `0px`                         |
| `--s-card-header-border-color` | `var(--s-card-border-color)`  |
| `--s-card-header-border-style` | `var(--s-card-border-style)`  |
| `--s-card-header-border-width` | `var(--s-card-border-width)`  |
| `--s-card-footer-border-color` | `var(--s-card-border-color)`  |
| `--s-card-footer-border-style` | `var(--s-card-border-style)`  |
| `--s-card-footer-border-width` | `var(--s-card-border-width)`  |
