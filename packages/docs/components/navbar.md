---
title: Navbar
subtitle: 头部导航
group: 导航组件
---

## 介绍

在页面顶部的导航栏。

## 代码演示

### 基础使用

使用 `title` 显示居中的标题。

<<< @demo/navbar/demo/Basic.vue

### 返回按钮

设置 `show-back` 显示返回按钮，设置 `back-text` 显示返回文本。

<<< @demo/navbar/demo/Back.vue

### 导航项

可以在 `start/end` 插槽中放置导航项。导航项带有默认的颜色和点击态。

内置的返回按钮也是使用导航项实现的。

<<< @demo/navbar/demo/Item.vue

### 流动导航

默认情况下标题居中， `start/end` 绝对定位于左右两侧；可以使用 `flow` 使其变为流动布局。

<<< @demo/navbar/demo/Flow.vue

### 自定义内容

默认插槽的内容会覆盖标题，可以实现更加自由的布局。

<<< @demo/navbar/demo/Content.vue

### 背景色

使用 css 变量 `--s-navbar-bg` 设置想要的背景色，例如全屏时设置背景透明。

<<< @demo/navbar/demo/Background.vue

### 文本颜色

使用 css 变量 `--s-navbar-item-color` 和 `--s-navbar-title-color` 设置导航项颜色和标题颜色。

<<< @demo/navbar/demo/Color.vue

## API

### NavbarProps

| 属性         | 描述                                                                              | 类型    | 默认值 |
| ------------ | --------------------------------------------------------------------------------- | ------- | ------ |
| title        | 自定义标题                                                                        | string  | -      |
| flow         | 默认 `start/end` 绝对定位于左右两侧，标题居中；可以使用 `flow` 使其变为流动布局。 | boolean | false  |
| show-back    | 是否显示返回按钮（仅显示，返回逻辑需自行编写）                                    | boolean | false  |
| back-text    | 返回按钮的文本                                                                    | string  | -      |
| fixed        | 是否固定到页面顶部                                                                | boolean | false  |
| status-bar   | 是否包含状态栏                                                                    | boolean | false  |
| show-divider | 是否显示分割线                                                                    | boolean | false  |

### NavbarSlots

| 插槽    | 描述                   | 属性 |
| ------- | ---------------------- | ---- |
| default | 自定义导航中间内容     | -    |
| title   | 自定义标题内容         | -    |
| start   | 自定义导航左侧区域内容 | -    |
| end     | 自定义导航右侧区域内容 | -    |

### NavbarEmits

| 事件 | 描述                 | 类型                          |
| ---- | -------------------- | ----------------------------- |
| back | 点击返回按钮项时触发 | `(event: MouseEvent) => void` |

### NavbarItemProps

| 属性    | 描述                             | 类型    | 默认值 |
| ------- | -------------------------------- | ------- | ------ |
| text    | 导航项文本                       | string  | -      |
| reverse | 默认图标在文本前面，可以互换位置 | boolean | false  |

### NavbarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标内容 | -    |

### NavbarItemEmits

| 事件  | 描述             | 类型                          |
| ----- | ---------------- | ----------------------------- |
| click | 点击导航项时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                         | 值                              |
| -------------------------------- | ------------------------------- |
| `--s-navbar-height`              | `var(--s-content-height)`       |
| `--s-navbar-bg`                  | `var(--s-bg-color-container)`   |
| `--s-navbar-z-index`             | `var(--s-z-index-secondary)`    |
| `--s-navbar-title-max-width`     | `60%`                           |
| `--s-navbar-title-font-size`     | `var(--s-font-size-lg)`         |
| `--s-navbar-title-color`         | `var(--s-text-color-emphasis)`  |
| `--s-navbar-back-color`          | `var(--s-text-color-secondary)` |
| `--s-navbar-item-padding-x`      | `var(--s-size-xs)`              |
| `--s-navbar-item-gap`            | `var(--s-size-2xs)`             |
| `--s-navbar-item-font-size`      | `var(--s-font-size-lg)`         |
| `--s-navbar-item-icon-size`      | `var(--s-size-lg)`              |
| `--s-navbar-item-color`          | `var(--s-color-primary)`        |
| `--s-navbar-item-opacity-active` | `var(--s-opacity-active)`       |
| `--s-navbar-start-gap`           | `var(--s-size-2xs)`             |
| `--s-navbar-end-gap`             | `var(--s-size-2xs)`             |
