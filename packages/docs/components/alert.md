---
title: Alert
subtitle: 警告提示
group: 反馈组件
---

## 介绍

突出显示要重点提示用户的信息。警告提示会一直显示，除非用户手动关闭。

## 代码演示

### 基础使用

<<< @demo/alert/demo/Basic.vue

### 类型

使用 `type` 属性设置不同的类型。

<<< @demo/alert/demo/Type.vue

### 显示图标

设置 `show-icon` 属性显示图标。

<<< @demo/alert/demo/ShowIcon.vue

### 可关闭的

设置 `closable` 属性显示关闭按钮。

<<< @demo/alert/demo/Closable.vue

### 方形警告框

警告框默认带有圆角，设置 `square` 可去掉其圆角。

<<< @demo/alert/demo/Square.vue

## API

### AlertProps

| 属性       | 描述             | 类型                                            | 默认值    |
| ---------- | ---------------- | ----------------------------------------------- | --------- |
| type       | 警告提示样式类型 | 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' |
| show-icon  | 是否显示图标     | boolean                                         | false     |
| closable   | 是否显示关闭按钮 | boolean                                         | false     |
| color      | 字体颜色         | string                                          | -         |
| background | 背景颜色         | string                                          | -         |
| square     | 方形警告框       | boolean                                         | false     |

### AlertSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标     | -    |

### AlertEmits

| 事件  | 描述             | 类型         |
| ----- | ---------------- | ------------ |
| close | 点击关闭按钮触发 | `() => void` |

## 主题定制

### 样式变量

| CSS 变量                    | 值                         |
| --------------------------- | -------------------------- |
| `--s-alert-padding`         | `var(--s-content-padding)` |
| `--s-alert-font-size`       | `var(--s-font-size)`       |
| `--s-alert-border-radius`   | `var(--s-border-radius)`   |
| `--s-alert-icon-margin-end` | `var(--s-size-xs)`         |
| `--s-alert-close-font-size` | `var(--s-font-size)`       |
| `--s-alert-close-padding`   | `var(--s-size-xs)`         |
