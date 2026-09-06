---
title: Flex
subtitle: 弹性布局
group: 布局
---

## 介绍

适合设置各种水平、垂直对齐方式，设置组件之间的间距。

## 代码演示

### 基础使用

最基础的用法，通过间距组件来给组件之间提供统一的间距。

<<< @demo/flex/demo/Basic.vue

### 垂直布局

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制。

<<< @demo/flex/demo/Vertical.vue

### 间距大小

通过调整 `gap` 的值来控制间距的大小。

使用内置的 `small、medium、large` 来设置间距大小。

<<< @demo/flex/demo/Gap.vue

### 自定义间距大小

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小来设置。

<<< @demo/flex/demo/CustomGap.vue

### 自动换行

在 `horizontal` 模式下，通过使用 `wrap` 来控制自动换行行为。

<<< @demo/flex/demo/Wrap.vue

### 对齐

设置该值可以调整所有子节点在容器内的对齐方式，可设置的值与 `align-items` 一致。

<<< @demo/flex/demo/Align.vue

## API

### FlexProps

| 属性      | 描述              | 类型                       | 默认值 |
| --------- | ----------------- | -------------------------- | ------ |
| direction | 排列的方向        | `FlexDirection`            | -      |
| gap       | 间隔大小          | `FlexGap` \| (string & {}) | -      |
| align     | 垂直排布方式      | `FlexAlign`                | -      |
| justify   | 水平排布方式      | `FlexJustify`              | -      |
| flex      | flex CSS 简写属性 | string                     | -      |
| wrap      | 设置是否自动折行  | boolean                    | false  |

```ts
type FlexGap = 'small' | 'medium' | 'large'
type FlexAlign = 'start' | 'end' | 'center' | 'baseline'
type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
type FlexDirection = 'column' | 'row' | 'column-reverse' | 'row-reverse'
```

### FlexSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量          | 值                 |
| ----------------- | ------------------ |
| `--s-flex-gap-sm` | `var(--s-size-xs)` |
| `--s-flex-gap`    | `var(--s-size-sm)` |
| `--s-flex-gap-lg` | `var(--s-size)`    |
