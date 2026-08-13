---
title: FloatingBubble
subtitle: 浮动气泡
group: 反馈组件
---

## 介绍

悬浮在窗口边缘的可点击的气泡。

## 代码演示

### 基础使用

浮动气泡默认展示在右下角，并允许在 y 轴方向上下拖拽。

<<< @demo/floating-bubble/demo/Basic.vue

### 自由拖拽和磁吸

`axis` 属性设置允许在 x 或 y 轴方向拖拽，`magnet` 属性设置松开手指后吸附到指定轴方向的最近一边。

<<< @demo/floating-bubble/demo/Magnet.vue

### 双向绑定

使用 `v-model:offset` 控制气泡的位置。

<<< @demo/floating-bubble/demo/Offset.vue

## API

### FloatingBubbleProps

| 属性      | 描述                                    | 类型                           | 默认值 |
| --------- | --------------------------------------- | ------------------------------ | ------ |
| axis      | 允许拖拽的方向轴                        | 'x' \| 'y' \| 'both' \| 'none' | 'y'    |
| magnet    | 吸附到指定轴最近的一边                  | 'x' \| 'y'                     | -      |
| margin-x  | 气泡与窗口左右两边的最小间距，单位为 px | number                         | 24     |
| margin-y  | 气泡与窗口上下两边的最小间距，单位为 px | number                         | 24     |
| offset    | 控制气泡的位置                          | `{ x: number; y: number }`     | -      |
| draggable | 是否可拖拽                              | boolean                        | true   |

### FloatingBubbleSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### FloatingBubbleEmits

| 事件          | 描述                         | 类型                                         |
| ------------- | ---------------------------- | -------------------------------------------- |
| click         | 点击时触发                   | `(event: MouseEvent) => void`                |
| update:offset | 因用户拖拽导致位置改变时触发 | `(offset: { x: number; y: number }) => void` |

## 主题定制

### 样式变量

| CSS 变量                             | 值                              |
| ------------------------------------ | ------------------------------- |
| `--s-floating-bubble-z-index`        | `var(--s-z-index-secondary)`    |
| `--s-floating-bubble-size`           | `var(--s-size-4xl)`             |
| `--s-floating-bubble-color`          | `var(--s-white)`                |
| `--s-floating-bubble-bg`             | `var(--s-color-primary)`        |
| `--s-floating-bubble-opacity-active` | `var(--s-opacity-active)`       |
| `--s-floating-bubble-duration`       | `var(--s-duration)`             |
| `--s-floating-bubble-box-shadow`     | `var(--s-box-shadow-secondary)` |
