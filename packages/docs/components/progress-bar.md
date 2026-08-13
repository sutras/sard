---
title: ProgressBar
subtitle: 条形进度条
group: 数据展示
---

## 介绍

以横条的方式展示当前进度。

## 代码演示

### 基础使用

设置 `percent` 属性展示当前所处进度。

<<< @demo/progress-bar/demo/Basic.vue

### 内部文本

设置 `inside` 属性让文本显示在进度条内部。

<<< @demo/progress-bar/demo/Inside.vue

### 隐藏文本

设置 `:showText="false"` 属性让文本隐藏。

<<< @demo/progress-bar/demo/ShowText.vue

### 粗细

使用 `thickness` 属性设置粗细。

<<< @demo/progress-bar/demo/Thickness.vue

### 颜色

使用 `track-color` 设置轨道颜色，使用 `color` 设置进度条颜色。

<<< @demo/progress-bar/demo/Color.vue

### 有条纹的

设置 `striped` 属性显示条纹，设置 `animated` 属性可以让条纹动起来。

<<< @demo/progress-bar/demo/Striped.vue

### 状态

设置 `status` 属性展示不同的状态。

<<< @demo/progress-bar/demo/Status.vue

## API

### ProgressBarProps

| 属性        | 描述             | 类型                              | 默认值 |
| ----------- | ---------------- | --------------------------------- | ------ |
| percent     | 当前进度         | number                            | 0      |
| inside      | 在内部显示文本   | boolean                           | false  |
| color       | 进度条颜色       | string                            | -      |
| track-color | 轨道颜色         | string                            | -      |
| thickness   | 进度条粗细       | string                            | -      |
| show-text   | 是否显示文本     | boolean                           | true   |
| striped     | 是否显示条纹样式 | boolean                           | false  |
| animated    | 是否显示条纹动画 | boolean                           | false  |
| status      | 进度条当前状态   | 'success' \| 'warning' \| 'error' | -      |

### ProgressBarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                                 | 值                              |
| ---------------------------------------- | ------------------------------- |
| `--s-progress-bar-height`                | `4px`                           |
| `--s-progress-bar-border-radius`         | `var(--s-border-radius-full)`   |
| `--s-progress-bar-track-bg`              | `var(--s-fill-color-secondary)` |
| `--s-progress-bar-fill-font-size`        | `var(--s-font-size)`            |
| `--s-progress-bar-fill-color`            | `var(--s-white)`                |
| `--s-progress-bar-fill-bg`               | `var(--s-color-primary)`        |
| `--s-progress-bar-text-font-size`        | `var(--s-font-size)`            |
| `--s-progress-bar-text-margin-start`     | `var(--s-size-xs)`              |
| `--s-progress-bar-text-margin-end`       | `var(--s-size-xs)`              |
| `--s-progress-bar-inside-height`         | `var(--s-size)`                 |
| `--s-progress-bar-inside-text-font-size` | `var(--s-font-size-sm)`         |
| `--s-progress-bar-striped-width`         | `var(--s-size)`                 |
| `--s-progress-bar-status-margin-start`   | `var(--s-size-xs)`              |
| `--s-progress-bar-color-success`         | `var(--s-color-success)`        |
| `--s-progress-bar-color-warning`         | `var(--s-color-warning)`        |
| `--s-progress-bar-color-error`           | `var(--s-color-danger)`         |
