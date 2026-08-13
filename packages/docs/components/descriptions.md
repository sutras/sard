---
title: Descriptions
subtitle: 描述列表
group: 数据展示
---

## 介绍

以表格形式成组展示多个只读字段，常用于详情页的信息展示。标签和内容分别独占一个单元格。

## 代码演示

### 基础使用

简单的描述列表展示。

<<< @demo/descriptions/demo/Basic.vue

### 带边框

设置 `bordered` 可以显示边框，标签单元格会带有浅色背景。

<<< @demo/descriptions/demo/Bordered.vue

### 带冒号

设置 `colon` 可以在标签后显示冒号。

<<< @demo/descriptions/demo/Colon.vue

### 标签对齐

通过 `label-align` 设置标签文本对齐方式，也可在 `DescriptionsItem` 上单独覆盖。

<<< @demo/descriptions/demo/Align.vue

### 多列布局

通过 `columns` 设置每行显示的列数。

<<< @demo/descriptions/demo/Columns.vue

### 合并列

通过 `DescriptionsItem` 的 `colspan` 属性设置列跨度，可以跨越多列。
最后一个单元格会自动跨越剩余的列。

<<< @demo/descriptions/demo/Colspan.vue

### 合并行

通过 `DescriptionsItem` 的 `rowspan` 属性设置行跨度，适合在相邻行展示跨行内容，如头像。

<<< @demo/descriptions/demo/Rowspan.vue

### 自定义插槽

可以通过插槽自定义标签和内容。

<<< @demo/descriptions/demo/Slot.vue

## API

### DescriptionsProps

| 属性       | 描述               | 类型                           | 默认值 |
| ---------- | ------------------ | ------------------------------ | ------ |
| bordered   | 是否显示边框       | boolean                        | false  |
| colon      | 标签后是否显示冒号 | boolean                        | false  |
| columns    | 每行列数           | number                         | 1      |
| labelWidth | 标签单元格宽度     | string                         | -      |
| labelAlign | 标签文本对齐方式   | `'start' \| 'center' \| 'end'` | -      |

### DescriptionsSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DescriptionsEmits

暂无事件。

### DescriptionsItemProps

| 属性       | 描述                             | 类型                           | 默认值 |
| ---------- | -------------------------------- | ------------------------------ | ------ |
| label      | 标签文本                         | string                         | -      |
| colspan    | 列跨度                           | number                         | 1      |
| rowspan    | 行跨度                           | number                         | 1      |
| labelWidth | 标签单元格宽度，可覆盖上级设置   | string                         | -      |
| labelAlign | 标签文本对齐方式，可覆盖上级设置 | `'start' \| 'center' \| 'end'` | -      |

### DescriptionsItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义内容     | -    |
| label   | 自定义标签内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                             | 值                             |
| ------------------------------------ | ------------------------------ |
| `--s-descriptions-label-color`       | `var(--s-text-color-tertiary)` |
| `--s-descriptions-label-font-size`   | `var(--s-font-size)`           |
| `--s-descriptions-label-bg`          | `var(--s-fill-color-fourth)`   |
| `--s-descriptions-content-color`     | `var(--s-text-color-primary)`  |
| `--s-descriptions-content-font-size` | `var(--s-font-size)`           |
| `--s-descriptions-item-padding-y`    | `var(--s-size-xs)`             |
| `--s-descriptions-item-padding-x`    | `var(--s-size-sm)`             |
| `--s-descriptions-border-color`      | `var(--s-border-color)`        |
