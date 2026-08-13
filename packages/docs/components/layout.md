---
title: Layout
subtitle: 布局
group: 布局
---

## 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用 `Row` 和 `Col` 组件，`Col` 必须嵌套在 `Row` 中。

## 代码演示

### 基础使用

使用`span`属性配置子元素占据的列数，不带 span 的 col 会平分空间。

<<< @demo/layout/demo/Basic.vue

### 列偏移

使用`offset`可以将列向右侧偏。

<<< @demo/layout/demo/Offset.vue

### 水平对齐

`justify`属性可以配置子元素在父容器中的水平对齐方式。

<<< @demo/layout/demo/Justify.vue

### 垂直对齐

`align`属性可以配置子元素在父容器中的垂直对齐方式。

<<< @demo/layout/demo/Align.vue

### 列间距

`gap`属性可以配置子元素之间的距离。

<<< @demo/layout/demo/Gap.vue

### 列顺序

通过`order`来改变元素的排序。

<<< @demo/layout/demo/Order.vue

## API

### RowProps

| 属性    | 描述         | 类型                                                              | 默认值 |
| ------- | ------------ | ----------------------------------------------------------------- | ------ |
| gap     | 列间距       | string \| number                                                  | -      |
| justify | 水平对齐方式 | 'start' \| 'center' \| 'end' \| 'around' \| 'between' \| 'evenly' | -      |
| align   | 垂直对齐方式 | 'start' \| 'center' \| 'end' \| 'stretch'                         | -      |

### RowSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ColProps

| 属性   | 描述           | 类型                       | 默认值 |
| ------ | -------------- | -------------------------- | ------ |
| span   | 列元素宽度     | number \| 'auto' \| 'none' | -      |
| offset | 列元素偏移距离 | number                     | -      |
| order  | 列元素顺序     | number                     | -      |

### ColSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
