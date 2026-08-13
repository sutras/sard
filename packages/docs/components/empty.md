---
title: Empty
subtitle: 空状态
group: 数据展示
---

## 介绍

空状态时的占位提示。

## 代码演示

### 基础使用

<<< @demo/empty/demo/Basic.vue

### 自定义描述信息

<<< @demo/empty/demo/Description.vue

### 自定义图标大小

通过配置 `iconSize` 属性可以修改图标大小。

<<< @demo/empty/demo/Size.vue

### 自定义图标

通过配置 `icon` 属性可以修改图标。

<<< @demo/empty/demo/Icon.vue

### 额外内容

额外内容会显示在底部。

<<< @demo/empty/demo/Extra.vue

## API

### EmptyProps

| 属性        | 描述     | 类型                | 默认值     |
| ----------- | -------- | ------------------- | ---------- |
| description | 描述信息 | string              | '暂无数据' |
| size        | 组件大小 | 'small' \| 'medium' | 'medium'   |
| icon-size   | 图标大小 | string \| number    | -          |

### EmptySlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义额外内容 | -    |
| icon        | 自定义图标内容 | -    |
| description | 自定义描述内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                                 | 值                           |
| ---------------------------------------- | ---------------------------- |
| `--s-empty-icon-font-size`               | `var(--s-size-4xl)`          |
| `--s-empty-icon-color`                   | `var(--s-gray-300)`          |
| `--s-empty-icon-line-height`             | `var(--s-line-height-none)`  |
| `--s-empty-description-margin-top`       | `var(--s-size)`              |
| `--s-empty-description-font-size`        | `var(--s-font-size)`         |
| `--s-empty-description-color`            | `var(--s-text-color-fourth)` |
| `--s-empty-extra-margin-top`             | `var(--s-size-lg)`           |
| `--s-empty-small-icon-font-size`         | `var(--s-size-3xl)`          |
| `--s-empty-small-description-margin-top` | `var(--s-size-sm)`           |
| `--s-empty-small-description-font-size`  | `var(--s-font-size-sm)`      |
