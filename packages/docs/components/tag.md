---
title: Tag
subtitle: 标签
group: 数据展示
---

## 介绍

用于分类或概括事物属性的标签。

## 代码演示

### 基础使用

`variant` 属性用于配置标签的变体，`color` 属性用于配置标签的主题色。

<<< @demo/tag/demo/ColorVariant.vue

### 圆角

通过 `round` 属性设置为圆角样式。

<<< @demo/tag/demo/Round.vue

### 标记样式（半圆角）

通过 `mark` 属性设置为标记样式(半圆角)。

<<< @demo/tag/demo/Mark.vue

### 尺寸

通过 `size` 属性调整标签大小。

<<< @demo/tag/demo/Size.vue

### 可关闭的

通过 `closeable` 属性添加关闭按钮，点击关闭按钮时会触发 `close` 事件。

<<< @demo/tag/demo/Closable.vue

## API

### TagProps

| 属性     | 描述       | 类型                                                                   | 默认值    |
| -------- | ---------- | ---------------------------------------------------------------------- | --------- |
| color    | 主题色     | 'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'default' |
| variant  | 主题色     | 'filled' \| 'solid' \| 'outlined'                                      | 'filled'  |
| round    | 圆角按标签 | boolean                                                                | false     |
| mark     | 标记标签   | 'left' \| 'right'                                                      | -         |
| size     | 标签尺寸   | 'small' \| 'medium' \| 'large'                                         | 'medium'  |
| closable | 是否可关闭 | boolean                                                                | false     |

### TagSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TagEmits

| 事件  | 描述               | 类型                          |
| ----- | ------------------ | ----------------------------- |
| click | 点击标签时触发     | `(event: MouseEvent) => void` |
| close | 点击关闭按钮时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                     | 值                          |
| ---------------------------- | --------------------------- |
| `--s-tag-color`              | `var(--s-white)`            |
| `--s-tag-height-sm`          | `16px`                      |
| `--s-tag-padding-sm`         | `0 4px`                     |
| `--s-tag-font-size-sm`       | `var(--s-font-size-xs)`     |
| `--s-tag-border-radius-sm`   | `var(--s-border-radius-sm)` |
| `--s-tag-height`             | `20px`                      |
| `--s-tag-padding`            | `0 6px`                     |
| `--s-tag-font-size`          | `var(--s-font-size-sm)`     |
| `--s-tag-border-radius`      | `var(--s-border-radius-sm)` |
| `--s-tag-height-lg`          | `24px`                      |
| `--s-tag-padding-lg`         | `0 8px`                     |
| `--s-tag-font-size-lg`       | `var(--s-font-size)`        |
| `--s-tag-border-radius-lg`   | `var(--s-border-radius)`    |
| `--s-tag-close-margin-start` | `var(--s-size-2xs)`         |
