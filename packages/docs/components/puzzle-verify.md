---
title: PuzzleVerify
subtitle: 拼图验证
group: 其他
---

## 介绍

根据提示滑动滑块使拼成完整一张图来完成验证。此组件基于 `SlideVerify` 组件。

## 代码演示

### 基础使用

用法同 `SlideVerify`，仅多了一个 `src` 属性以展示图片的形式来代替虚线目标框。

图片宽度 100%，高度自适应，为避免图片未加载完时位置被占领，可设置 `aspect-ratio` 属性让容器占据一定高度。

<<< @demo/puzzle-verify/demo/Basic.vue

## API

### PuzzleVerifyProps

继承 [`SlideVerifyProps`](./slide-verify#SlideVerifyProps) 。

| 属性         | 描述                         | 类型   | 默认值    |
| ------------ | ---------------------------- | ------ | --------- |
| src          | 图片资源地址                 | string | -         |
| aspect-ratio | 图片宽高比，用于占位图片高度 | number | 320 / 240 |

### PuzzleVerifyEmits

继承 [`SlideVerifyEmits`](./slide-verify#SlideVerifyEmits)

### PuzzleVerifyExpose

继承 [`SlideVerifyExpose`](./slide-verify#SlideVerifyExpose)

## 主题定制

### 样式变量

| CSS 变量                                | 值                                     |
| --------------------------------------- | -------------------------------------- |
| `--s-puzzle-verify-image-margin-bottom` | `var(--s-size-sm)`                     |
| `--s-puzzle-verify-piece-width`         | `var(--s-content-height)`              |
| `--s-puzzle-verify-piece-height`        | `var(--s-content-height)`              |
| `--s-puzzle-verify-piece-box-shadow`    | `2px 2px 15px rgb(0 0 0 / 0.8)`        |
| `--s-puzzle-verify-hollow-box-shadow`   | `inset 2px 2px 5px 0 rgb(0 0 0 / 0.4)` |
