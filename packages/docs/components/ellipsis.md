---
title: Ellipsis
subtitle: 文本省略
group: 数据展示
---

## 介绍

对长文本进行省略，支持展开和收起，并可自定义展示行数、省略位置和省略符号。

## 代码演示

### 基础用法

使用 `content` 属性设置内容，默认展示 1 行，超过 1 行显示省略号。

<<< @demo/ellipsis/demo/Basic.vue

### 展开/收起

当设置 `expand-text` 和 `collapse-text` 时，超过行数支持展开和收起。

<<< @demo/ellipsis/demo/Expand.vue

### 自定义展示行数

通过设置 `rows` 限制展示行数。

<<< @demo/ellipsis/demo/Rows.vue

### 自定义省略符号

通过 `dots` 属性可以自定义省略符号。

<<< @demo/ellipsis/demo/Dots.vue

### 自定义省略位置

通过设置 `position` 控制省略位置，支持头部省略、中部省略和尾部省略，默认尾部省略。

<<< @demo/ellipsis/demo/Position.vue

### 动态切换

演示属性改变时重新渲染的效果。

<<< @demo/ellipsis/demo/Dynamic.vue

## API

### EllipsisProps

| 属性          | 描述         | 类型             | 默认值  |
| ------------- | ------------ | ---------------- | ------- |
| content       | 文本内容     | string           | `''`    |
| rows          | 展示行数     | number           | `1`     |
| position      | 省略位置     | EllipsisPosition | `'end'` |
| dots          | 省略符号     | string           | `'...'` |
| expand-text   | 展开按钮文本 | string           | -       |
| collapse-text | 收起按钮文本 | string           | -       |
| expanded      | 是否默认展开 | boolean          | false   |

### EllipsisEmits

| 事件            | 描述               | 类型                          |
| --------------- | ------------------ | ----------------------------- |
| update:expanded | 展开状态变化时触发 | `(expanded: boolean) => void` |
| change          | 点击切换按钮时触发 | `(expanded: boolean) => void` |

### EllipsisPosition

```ts
type EllipsisPosition = 'start' | 'middle' | 'end'
```

## 实现说明

截断点不是估算的，而是**逐字二分**出来的：在一个隐藏的测量层里反复写入候选文本、读一次高度，收敛到「能塞进 `rows` 行的最多字符数」。

- 测量层只有一个节点（正文 + 按钮占位），绝对定位 + `contain: layout`，不参与可见布局；测量引起的布局失效也不会传播到祖先链，不会带出整页重排。
- 每轮探测只写一次文本、读一次高度，全部同步完成，**不触发组件重渲染**——所以 `content` 变化、容器尺寸变化时不会看到中间态。
- 单行高度取自同一段文本（临时关掉换行量一次），而不是 `getComputedStyle().lineHeight`：`line-height: normal` 拿不到数值，混排字体的行盒高也未必等于 `line-height`。
- 配了 `expand-text` / `collapse-text` 时，最后一行要为按钮预留宽度，所以正文的截断点会比不带按钮时更靠前；按钮文案变化会重新计算。

## 主题定制

### 样式变量

| CSS 变量                           | 值                       |
| ---------------------------------- | ------------------------ |
| `--s-ellipsis-action-margin-start` | `var(--s-size-2xs)`      |
| `--s-ellipsis-action-color`        | `var(--s-color-primary)` |
