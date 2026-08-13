---
title: Button
subtitle: 按钮
group:
  title: 基础组件
  order: 0
---

## 介绍

按钮用于开始一个即时操作。

## 代码演示

### 颜色与变体

`variant` 属性用于配置按钮的变体，`color` 属性用于配置按钮的主题色。

<<< @demo/button/demo/ColorVariant.vue

### 自定义颜色

如果内置主题色不合适，可以自定义颜色。使用 `color` 和 `background` 属性定义字体颜色和背景色。

<<< @demo/button/demo/Color.vue

### 圆形按钮

使用 `round` 属性设置为圆形按钮。

<<< @demo/button/demo/Round.vue

### 方形按钮

使用 `square` 属性设置为方形按钮。

<<< @demo/button/demo/Square.vue

### 禁用按钮

禁用状态的按钮不可点击。

<<< @demo/button/demo/Disabled.vue

### 按钮尺寸

内置四种尺寸以供选择。

<<< @demo/button/demo/Size.vue

### 加载中

加载中的按钮不可点击。

<<< @demo/button/demo/Loading.vue

### 块级按钮

使用 `block` 属性将按钮设为块级元素。

<<< @demo/button/demo/Block.vue

### 图标按钮

可通过 `icon` 插槽设置图标，相对于通过默认插槽添加图标，前者会有默认的样式，并可与 `loading` 相切换。

<<< @demo/button/demo/Icon.vue

### 幽灵按钮

使用 `ghost` 属性设置为幽灵按钮。

<<< @demo/button/demo/Ghost.vue

## API

### ButtonProps

| 属性        | 描述                         | 类型                                                                                              | 默认值     |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| variant     | 按钮变体                     | 'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'                                 | 'solid'    |
| color       | 按钮主题色                   | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral' \| 'white' \| 'black' | 'primary'  |
| size        | 按钮尺寸                     | 'xs' \| 'small' \| 'medium' \| 'large'                                                            | 'medium'   |
| round       | 圆角按钮                     | boolean                                                                                           | false      |
| square      | 方形按钮                     | boolean                                                                                           | false      |
| disabled    | 禁用按钮                     | boolean                                                                                           | false      |
| loading     | 加载状态                     | boolean                                                                                           | false      |
| loadingType | 加载类型                     | 'clock' \| 'circular'                                                                             | 'circular' |
| block       | 将按钮设为块级元素           | boolean                                                                                           | false      |
| html-type   | 原生按钮类型                 | 'button' \| 'submit' \| 'reset'                                                                   | 'button'   |
| ghost       | 幽灵按钮                     | boolean                                                                                           | false      |
| auto-height | 是否自动高度                 | boolean                                                                                           | false      |
| compact     | 紧凑样式，会去掉高度和内边距 | boolean                                                                                           | false      |

### ButtonSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标内容 | -    |

### ButtonEmits

| 事件  | 描述                                   | 类型                          |
| ----- | -------------------------------------- | ----------------------------- |
| click | 点击按钮时触发，加载和禁用状态不会触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                      | 值                          |
| ----------------------------- | --------------------------- |
| `--s-button-height-xs`        | `var(--s-size-xl)`          |
| `--s-button-padding-y-xs`     | `0`                         |
| `--s-button-padding-x-xs`     | `6px`                       |
| `--s-button-border-radius-xs` | `var(--s-border-radius-sm)` |
| `--s-button-font-size-xs`     | `var(--s-font-size-sm)`     |
| `--s-button-icon-size-xs`     | `var(--s-font-size-sm)`     |
| `--s-button-height-sm`        | `var(--s-size-2xl)`         |
| `--s-button-padding-y-sm`     | `0`                         |
| `--s-button-padding-x-sm`     | `9px`                       |
| `--s-button-border-radius-sm` | `var(--s-border-radius-sm)` |
| `--s-button-font-size-sm`     | `var(--s-font-size-sm)`     |
| `--s-button-icon-size-sm`     | `var(--s-font-size)`        |
| `--s-button-height`           | `var(--s-size-3xl)`         |
| `--s-button-padding-y`        | `0`                         |
| `--s-button-padding-x`        | `11px`                      |
| `--s-button-border-radius`    | `var(--s-border-radius)`    |
| `--s-button-font-size`        | `var(--s-font-size)`        |
| `--s-button-icon-size`        | `18px`                      |
| `--s-button-height-lg`        | `var(--s-size-4xl)`         |
| `--s-button-padding-y-lg`     | `0`                         |
| `--s-button-padding-x-lg`     | `14px`                      |
| `--s-button-border-radius-lg` | `var(--s-border-radius)`    |
| `--s-button-font-size-lg`     | `var(--s-font-size-lg)`     |
| `--s-button-icon-size-lg`     | `20px`                      |
| `--s-button-outlined-bg`      | `var(--s-white)`            |
| `--s-button-secondary-color`  | `var(--s-gray-800)`         |
