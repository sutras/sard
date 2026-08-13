---
title: ProgressCircle
subtitle: 环形进度条
group: 数据展示
---

## 介绍

以环形的方式展示当前进度。

## 代码演示

### 基础使用

使用 `percent` 属性设置当前进度。

<<< @demo/progress-circle/demo/Basic.vue

### 粗细

使用 `thickness` 属性设置圆环的粗细，这是一个占圆环直径的百分比值。

<<< @demo/progress-circle/demo/Thickness.vue

### 颜色

使用 `track-color` 设置轨道颜色，使用 `color` 设置进度条颜色。

<<< @demo/progress-circle/demo/Color.vue

### 尺寸

使用 `size` 设置圆环直径。

<<< @demo/progress-circle/demo/Size.vue

### 状态

使用 `status` 属性设置不同的状态。

<<< @demo/progress-circle/demo/Status.vue

## API

### ProgressCircleProps

| 属性        | 描述                                 | 类型                              | 默认值 |
| ----------- | ------------------------------------ | --------------------------------- | ------ |
| percent     | 当前进度                             | number                            | 0      |
| color       | 进度条颜色                           | string                            | -      |
| track-color | 轨道颜色                             | string                            | -      |
| thickness   | 进度条粗细，表示占圆环直径的百分比值 | number                            | 4      |
| size        | 圆环尺寸                             | string                            | -      |
| status      | 进度条当前状态                       | 'success' \| 'warning' \| 'error' | -      |

### ProgressCircleSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                               | 值                              |
| -------------------------------------- | ------------------------------- |
| `--s-progress-circle-size`             | `100px`                         |
| `--s-progress-circle-track-bg`         | `var(--s-fill-color-secondary)` |
| `--s-progress-circle-fill-bg`          | `var(--s-color-primary)`        |
| `--s-progress-circle-text-font-size`   | `var(--s-font-size)`            |
| `--s-progress-circle-status-font-size` | `18px`                          |
| `--s-progress-circle-color-success`    | `var(--s-color-success)`        |
| `--s-progress-circle-color-warning`    | `var(--s-color-warning)`        |
| `--s-progress-circle-color-error`      | `var(--s-color-danger)`         |
