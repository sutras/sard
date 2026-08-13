---
title: Fab
subtitle: 悬浮按钮
group: 反馈组件
---

## 介绍

悬浮按钮，点击可展开扩展按钮。

## 代码演示

### 基础使用

设置 `item-list` 属性配置扩展按钮，监听 `select` 事件来知晓用户点击了哪个按钮。

<<< @demo/fab/demo/Basic.vue

### 自定义颜色

设置 `background` 属性以及按钮项的 `background` 自定义背景色。

<<< @demo/fab/demo/Color.vue

### 隐藏按钮名称

默认会显示按钮项的 `name` 属性，可以设置 `hide-name` 属性进行隐藏。

<<< @demo/fab/demo/HideName.vue

### 左上角显示

按钮默认显示在右下角，设置 `left` 或 `top` 可以让其显示在左上角。

<<< @demo/fab/demo/TopLeft.vue

### 右上角显示

按钮默认显示在右下角，设置 `top` 会将其从底部显示在顶部。

<<< @demo/fab/demo/TopRight.vue

### 左下角显示

按钮默认显示在右下角，设置 `left` 会将其从右边显示在左边。

<<< @demo/fab/demo/BottomLeft.vue

### 自定义图标

<<< @demo/fab/demo/Icon.vue

### 自定义插槽内容

使用 `default` 插槽自定义入口按钮内容，使用 `list` 插槽自定义扩展按钮内容，需要自行循环 `FabItem` 组件。

<<< @demo/fab/demo/Slots.vue

### 可拖拽的

设置 `draggable` 属性，悬浮按钮展示在右下角，允许在 y 轴方向上下拖拽。

<<< @demo/fab/demo/Draggable.vue

### 自由拖拽和磁吸

`axis` 属性设置允许在 x 或 y 轴方向拖拽，`magnet` 属性设置松开手指后吸附到指定轴方向的最近一边。

<<< @demo/fab/demo/Magnet.vue

### 双向绑定

使用 `v-model:offset` 控制悬浮按钮的位置。

<<< @demo/fab/demo/Offset.vue

## API

### FabProps

| 属性             | 描述                                                      | 类型                           | 默认值 |
| ---------------- | --------------------------------------------------------- | ------------------------------ | ------ |
| top              | 设置距离窗口顶部的距离，优先级比 `bottom` 高              | string                         | -      |
| right            | 设置距离窗口右边的距离                                    | string                         | -      |
| bottom           | 设置距离窗口底部的距离                                    | string                         | -      |
| left             | 设置距离窗口左边的距离，优先级比 `right` 高               | string                         | -      |
| color            | 设置按钮图标的颜色                                        | string                         | -      |
| background       | 设置按钮的背景色                                          | string                         | -      |
| hide-name        | 是否隐藏按钮名称                                          | boolean                        | false  |
| overlay-closable | 点击遮罩是否隐藏扩展按钮                                  | boolean                        | false  |
| draggable        | 是否可拖拽                                                | boolean                        | false  |
| axis             | 允许拖拽的方向轴                                          | 'x' \| 'y' \| 'both' \| 'none' | 'y'    |
| magnet           | 吸附到指定轴最近的一边，在拖拽时使用                      | 'x' \| 'y'                     | -      |
| margin-x         | 悬浮按钮与窗口左右两边的最小间距，单位为 px，在拖拽时使用 | number                         | 24     |
| margin-y         | 悬浮按钮与窗口上下两边的最小间距，单位为 px，在拖拽时使用 | number                         | 24     |
| offset           | 控制悬浮按钮的位置，在拖拽时使用                          | `{ x: number; y: number }`     | -      |

### FabSlots

| 插槽    | 描述               | 属性                   |
| ------- | ------------------ | ---------------------- |
| default | 自定义扩展按钮内容 | -                      |
| entry   | 自定义入口按钮内容 | `{ visible: boolean }` |

### FabEmits

| 事件           | 描述                         | 类型                                         |
| -------------- | ---------------------------- | -------------------------------------------- |
| click          | 点击入口按钮时触发           | `(event: MouseEvent) => void`                |
| update:visible | 扩展按钮显隐变化时触发       | `(visible: boolean) => void`                 |
| update:offset  | 因用户拖拽导致位置改变时触发 | `(offset: { x: number; y: number }) => void` |

### FabItemProps

| 属性       | 描述         | 类型   | 默认值 |
| ---------- | ------------ | ------ | ------ |
| name       | 按钮名称     | string | -      |
| color      | 按钮图标颜色 | string | -      |
| background | 按钮背景色   | string | -      |

### FabItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义按钮内容 | -    |
| name    | 自定义名称内容 | -    |

### FabItemEmits

| 事件  | 描述           | 类型                          |
| ----- | -------------- | ----------------------------- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                      | 值                              |
| ----------------------------- | ------------------------------- |
| `--s-fab-z-index`             | `var(--s-z-index-secondary)`    |
| `--s-fab-right`               | `var(--s-size-xl)`              |
| `--s-fab-bottom`              | `var(--s-size-4xl)`             |
| `--s-fab-mask`                | `var(--s-overlay-illegible)`    |
| `--s-fab-item-gap`            | `var(--s-size)`                 |
| `--s-fab-item-opacity-active` | `var(--s-opacity-active)`       |
| `--s-fab-item-btn-size`       | `var(--s-size-4xl)`             |
| `--s-fab-item-btn-font-size`  | `var(--s-size-xl)`              |
| `--s-fab-item-btn-color`      | `var(--s-white)`                |
| `--s-fab-item-btn-bg`         | `var(--s-color-primary)`        |
| `--s-fab-item-btn-box-shadow` | `var(--s-box-shadow-secondary)` |
| `--s-fab-item-name-gap`       | `var(--s-size-xs)`              |
| `--s-fab-item-name-font-size` | `var(--s-font-size)`            |
| `--s-fab-item-name-color`     | `var(--s-white)`                |
