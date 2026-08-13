---
title: FloatingPanel
subtitle: 浮动面板
group: 反馈组件
---

## 介绍

浮动在页面底部的面板，可以上下拖动来浏览内容，从而在不离开当前视图的情况下访问更多信息，常用于地图导航。

## 代码演示

### 基础使用

`FloatingPanel` 的默认高度为 `100px`，用户可以拖动来展开面板，使高度达到 60% 的可用窗口高度。

<<< @demo/floating-panel/demo/Basic.vue

### 自定义锚点

你可以通过 `anchors` 属性来设置 `FloatingPanel` 的锚点位置，并通过 `v-model:height` 来控制当前面板的显示高度。

比如，使面板的高度在 100px、40% 可用窗口高度和 70% 可用窗口高度三个位置停靠：

<<< @demo/floating-panel/demo/Anchors.vue

### 仅头部拖拽

默认情况下，`FloatingPanel` 的头部区域和内容区域都可以被拖拽，你可以通过 `content-draggable` 属性来禁用内容区域的拖拽。

<<< @demo/floating-panel/demo/ContentDraggable.vue

## API

### FloatingPanelProps

| 属性                   | 描述                    | 类型     | 默认值                          |
| ---------------------- | ----------------------- | -------- | ------------------------------- |
| height                 | 当前面板的显示高度      | number   | 0                               |
| anchors                | 设置自定义锚点, 单位 px | number[] | [100, window.innerHeight * 0.6] |
| duration               | 动画时长，单位毫秒      | number   | 300                             |
| content-draggable      | 允许拖拽内容容器        | boolean  | true                            |
| safe-area-inset-bottom | 是否开启底部安全区适配  | boolean  | true                            |

### FloatingPanelSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### FloatingPanelEmits

| 事件          | 描述                             | 类型                      |
| ------------- | -------------------------------- | ------------------------- |
| update:height | 面板显示高度改变时触发           | `(value: number) => void` |
| height-change | 面板显示高度改变且结束拖动后触发 | `(value: number) => void` |

## 主题定制

### 样式变量

| CSS 变量                           | 值                              |
| ---------------------------------- | ------------------------------- |
| `--s-floating-panel-z-index`       | `var(--s-z-index-secondary)`    |
| `--s-floating-panel-bg`            | `var(--s-bg-color-elevated)`    |
| `--s-floating-panel-radius`        | `var(--s-border-radius-xl)`     |
| `--s-floating-panel-header-height` | `var(--s-size-2xl)`             |
| `--s-floating-panel-bar-width`     | `var(--s-size-lg)`              |
| `--s-floating-panel-bar-height`    | `3px`                           |
| `--s-floating-panel-bar-color`     | `var(--s-fill-color-secondary)` |
