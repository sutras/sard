---
title: Grid
subtitle: 宫格
group:
  title: 布局
  order: 1
---

## 介绍

将多个类目进行等宽排列，用于内容展示或者页面导航。

## 代码演示

### 基础使用

使用`text`属性设置文本内容，使用`icon`插槽设置图标。

<<< @demo/grid/demo/Basic.vue

### 自定义列数

默认一行展示四个格子，可以通过`columns`自定义列数。

<<< @demo/grid/demo/Columns.vue

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致。

<<< @demo/grid/demo/Square.vue

### 格子间距

通过`gap`属性设置格子之间的距离。

<<< @demo/grid/demo/Gap.vue

### 显示边框

显示边框后看起来分割更明显。

<<< @demo/grid/demo/Border.vue

### 内容横排

将`direction`属性设置为`horizontal`可以让宫格的内容呈横向排列。

<<< @demo/grid/demo/Horizontal.vue

### 内容翻转

将文本和图标的位置调换。

<<< @demo/grid/demo/Reverse.vue

### 可点击的

添加点击态。

<<< @demo/grid/demo/Clickable.vue

### 徽标提示

可结合图标插槽和徽标组件。

<<< @demo/grid/demo/Badge.vue

### 自定义内容

通过默认插槽可以自定义格子展示的内容。

<<< @demo/grid/demo/Custom.vue

## API

### GridProps

| 属性      | 描述                     | 类型                       | 默认值     |
| --------- | ------------------------ | -------------------------- | ---------- |
| columns   | 列数                     | number                     | 4          |
| gap       | 格子间距                 | string                     | 0          |
| bordered  | 是否显示边框             | boolean                    | false      |
| square    | 是否将格子显示为正方形   | boolean                    | false      |
| clickable | 格子是否可点击           | boolean                    | false      |
| reverse   | 是否调换图标和文本的位置 | boolean                    | false      |
| direction | 格子排列方向             | 'horizontal' \| 'vertical' | 'vertical' |

### GridSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### GridItemProps

| 属性          | 描述                       | 类型                             | 默认值 |
| ------------- | -------------------------- | -------------------------------- | ------ |
| content-class | 内容元素类名               | string                           | -      |
| content-style | 内容元素样式               | StyleValue                       | -      |
| text          | 自定义文字内容             | string                           | -      |
| dot           | 是否显示宫格项右上角小红点 | boolean                          | false  |
| badge         | 宫格项右上角徽标的内容     | number \| string                 | -      |
| badge-props   | 自定义徽标属性             | [BadgeProps](./badge#BadgeProps) | -      |

### GridItemSlots

| 插槽    | 描述                             | 属性 |
| ------- | -------------------------------- | ---- |
| default | 自定义默认内容，会覆盖所有内容   | -    |
| content | 自定义默认内容，会覆盖文字和图标 | -    |
| text    | 自定义文字内容，会覆盖`text`属性 | -    |
| icon    | 自定义图标内容，会覆盖`icon`属性 | -    |

### GridItemEmits

| 事件  | 描述           | 类型                          |
| ----- | -------------- | ----------------------------- |
| click | 点击格子时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                     | 值                            |
| ---------------------------- | ----------------------------- |
| `--s-grid-bg`                | `var(--s-bg-color-container)` |
| `--s-grid-bg-active`         | `var(--s-bg-color-active)`    |
| `--s-grid-border-color`      | `var(--s-border-color)`       |
| `--s-grid-content-padding-x` | `var(--s-size-xs)`            |
| `--s-grid-content-padding-y` | `var(--s-size)`               |
| `--s-grid-content-gap`       | `var(--s-size-xs)`            |
| `--s-grid-icon-size`         | `var(--s-size-xl)`            |
| `--s-grid-text-font-size`    | `var(--s-font-size-sm)`       |
| `--s-grid-text-line-height`  | `var(--s-line-height-tight)`  |
| `--s-grid-text-color`        | `var(--s-text-color-primary)` |
