---
title: Skeleton
subtitle: 骨架屏
group: 反馈组件
---

## 介绍

在内容加载过程中提供一组占位图形，通常图形会描述内容的概要排版。

## 代码演示

### 基础使用

默认展示三行占位元素。

<<< @demo/skeleton/demo/Basic.vue

### 显示标题

设置 `title` 属性显示标题占位元素。

<<< @demo/skeleton/demo/Title.vue

### 显示头像

设置 `avatar` 属性显示头像占位元素。

<<< @demo/skeleton/demo/Avatar.vue

### 圆形头像

设置 `avatarRound` 属性显示头圆形像占位元素。

<<< @demo/skeleton/demo/RoundAvatar.vue

### 圆角标题和段落

设置 `round` 属性显示圆角标题和段落。

<<< @demo/skeleton/demo/RoundTitle.vue

### 动画效果

设置 `animated` 属性显示动画效果。

<<< @demo/skeleton/demo/Animated.vue

### 包含子组件

将 `loading` 属性设置成 `false` 表示内容加载完成，此时会隐藏占位图。

<<< @demo/skeleton/demo/Contain.vue

### 自定义

可以通过 `SkeletonBlock`、`SkeletonAvatar`、`SkeletonTitle`、`SkeletonParagraph` 自由组合使用。

<<< @demo/skeleton/demo/Custom.vue

## API

### SkeletonProps

| 属性         | 描述                                          | 类型             | 默认值 |
| ------------ | --------------------------------------------- | ---------------- | ------ |
| rows         | 段落行数                                      | number           | 3      |
| title        | 是否显示标题                                  | boolean          | false  |
| avatar       | 是否显示头像                                  | boolean          | false  |
| avatar-size  | 头像尺寸                                      | number \| string | -      |
| avatar-round | 是否显示圆形头像                              | boolean          | true   |
| round        | 是否将标题和段落显示为圆角风格                | boolean          | false  |
| loading      | 是否显示骨架屏，传 `false` 时会展示子组件内容 | boolean          | true   |
| animated     | 是否开启动画                                  | boolean          | false  |

### SkeletonBlockProps

| 属性     | 描述               | 类型    | 默认值 |
| -------- | ------------------ | ------- | ------ |
| animated | 是否开启动画       | boolean | false  |
| round    | 是否显示为圆角风格 | boolean | false  |
| width    | 设置宽度           | string  | -      |
| height   | 设置高度           | string  | -      |

### SkeletonAvatarProps

继承 [`SkeletonBlockProps`](#SkeletonBlockProps) 。

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| size | 头像尺寸 | string | -      |

### SkeletonTitleProps

继承 [`SkeletonBlockProps`](#SkeletonBlockProps) 。

### SkeletonParagraphProps

继承 [`SkeletonBlockProps`](#SkeletonBlockProps) 。

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| rows | 段落行数 | number | 3      |

## 主题定制

### 样式变量

| CSS 变量                           | 值                              |
| ---------------------------------- | ------------------------------- |
| `--s-skeleton-bg`                  | `var(--s-fill-color-secondary)` |
| `--s-skeleton-radius`              | `var(--s-border-radius-sm)`     |
| `--s-skeleton-highlight-color`     | `rgba(0, 0, 0, 0.08)`           |
| `--s-skeleton-block-height`        | `var(--s-size)`                 |
| `--s-skeleton-avatar-size`         | `var(--s-size-2xl)`             |
| `--s-skeleton-avatar-margin-end`   | `var(--s-size)`                 |
| `--s-skeleton-title-width`         | `40%`                           |
| `--s-skeleton-title-height`        | `var(--s-size-lg)`              |
| `--s-skeleton-title-margin-bottom` | `var(--s-size)`                 |
| `--s-skeleton-row-last-width`      | `60%`                           |
| `--s-skeleton-row-gap`             | `var(--s-size-sm)`              |
