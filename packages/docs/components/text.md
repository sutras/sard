---
title: Text
subtitle: 文本
group: 基础组件
---

## 介绍

用于文本展示，支持颜色、大小、单行和多行省略等样式控制。

## 代码演示

### 基础使用

通过默认插槽传入要展示的文本内容。

<<< @demo/text/demo/Basic.vue

### 文本颜色

通过 `color` 属性设置文本的颜色，支持 `default`、`secondary`、`tertiary`、`fourth`、`primary`、`success`、`warning`、`danger`。

<<< @demo/text/demo/Color.vue

### 文本大小

通过 `size` 属性设置文本的大小，支持 `small`、`medium`、`large`。

<<< @demo/text/demo/Size.vue

### 单行省略

通过 `truncated` 属性可以让超出容器宽度的文本显示省略号。需要配合设置容器宽度。

<<< @demo/text/demo/Truncated.vue

### 多行省略

通过 `line-clamp` 属性可以限制文本显示的行数，超出部分显示省略号。

<<< @demo/text/demo/LineClamp.vue

### 自定义标签

通过 `tag` 属性可以指定渲染的 HTML 标签，默认为 `span`，可以设置为 `p`、`div`、`h1` 等。

<<< @demo/text/demo/Tag.vue

## API

### TextProps

| 属性       | 描述                                       | 类型                                                                                                  | 默认值    |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------- |
| color      | 文本颜色                                   | `default` \| `secondary` \| `tertiary` \| `fourth` \| `primary` \| `success` \| `warning` \| `danger` | `default` |
| size       | 文本大小                                   | `small` \| `medium` \| `large`                                                                        | `medium`  |
| truncated  | 是否单行省略，超出容器宽度显示省略号       | boolean                                                                                               | false     |
| line-clamp | 多行省略行数，设置后超出指定行数显示省略号 | number                                                                                                | -         |
| tag        | 渲染的 HTML 标签                           | string                                                                                                | `span`    |

### TextSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义文本内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                | 值                      |
| ----------------------- | ----------------------- |
| `--s-text-font-size-sm` | `var(--s-font-size-sm)` |
| `--s-text-font-size`    | `var(--s-font-size)`    |
| `--s-text-font-size-lg` | `var(--s-font-size-lg)` |
