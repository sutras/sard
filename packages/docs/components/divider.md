---
title: Divider
subtitle: 分割线
group: 布局
---

## 介绍

用于将内容分隔为多个区域。

## 代码演示

### 基础使用

默认渲染一条水平分割线。

<<< @demo/divider/demo/Basic.vue

### 展示文本

通过插槽在可以分割线中间插入内容。

<<< @demo/divider/demo/Text.vue

### 内容位置

通过 `position` 指定内容所在位置。

<<< @demo/divider/demo/Position.vue

### 线条类型

通过 `type` 属性设置分割线类型。

<<< @demo/divider/demo/Type.vue

### 自定义样式

可以直接通过 `style` 属性设置分割线的样式。

<<< @demo/divider/demo/Style.vue

### 垂直

设置 `vertical` 属性可以垂直展示分割线

<<< @demo/divider/demo/Vertical.vue

## API

### DividerProps

| 属性     | 描述                 | 类型                            | 默认值   |
| -------- | -------------------- | ------------------------------- | -------- |
| type     | 分割线类型           | 'solid' \| 'dashed' \| 'dotted' | 'solid'  |
| hairline | 是否显示半像素分割线 | boolean                         | true     |
| position | 内容位置             | 'left' \| 'right' \| 'center'   | 'center' |
| vertical | 是否垂直显示分割线   | boolean                         | false    |

### DividerSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                      | 值                             |
| ----------------------------- | ------------------------------ |
| `--s-divider-margin-y`        | `var(--s-size)`                |
| `--s-divider-margin-x`        | `var(--s-size-xs)`             |
| `--s-divider-gap`             | `var(--s-size)`                |
| `--s-divider-color`           | `var(--s-text-color-tertiary)` |
| `--s-divider-border-color`    | `var(--s-border-color)`        |
| `--s-divider-left-width`      | `10%`                          |
| `--s-divider-right-width`     | `10%`                          |
| `--s-divider-vertical-height` | `1em`                          |
