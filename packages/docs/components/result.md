---
title: Result
subtitle: 结果
group: 反馈组件
---

## 介绍

用于反馈用户的操作结果。

## 代码演示

### 基础使用

设置 `status` 属性展示不同状态的结果。

<<< @demo/result/demo/Basic.vue

### 额外内容

默认插槽内容会在底部展示。

<<< @demo/result/demo/Extra.vue

### 自定义图标

通过 `icon` 属性设置自定义图标。

<<< @demo/result/demo/Icon.vue

## API

### ResultProps

| 属性        | 描述       | 类型                                                      | 默认值 |
| ----------- | ---------- | --------------------------------------------------------- | ------ |
| status      | 结果的状态 | 'success' \| 'info' \| 'warning' \| 'error' \| 'question' | 'info' |
| title       | 标题       | string                                                    | -      |
| description | 描述       | string                                                    | -      |

### ResultSlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义额外内容 | -    |
| title       | 自定义标题     | -    |
| description | 自定义描述     | -    |
| icon        | 自定义图标     | -    |

## 主题定制

### 样式变量

| CSS 变量                            | 值                             |
| ----------------------------------- | ------------------------------ |
| `--s-result-icon-font-size`         | `var(--s-size-4xl)`            |
| `--s-result-color-success`          | `var(--s-color-success)`       |
| `--s-result-color-info`             | `var(--s-color-primary)`       |
| `--s-result-color-warning`          | `var(--s-color-warning)`       |
| `--s-result-color-error`            | `var(--s-color-danger)`        |
| `--s-result-color-question`         | `var(--s-color-primary)`       |
| `--s-result-title-margin-top`       | `var(--s-size)`                |
| `--s-result-title-font-size`        | `var(--s-font-size-xl)`        |
| `--s-result-description-margin-top` | `var(--s-size-2xs)`            |
| `--s-result-description-font-size`  | `var(--s-font-size)`           |
| `--s-result-description-color`      | `var(--s-text-color-tertiary)` |
| `--s-result-extra-margin-top`       | `var(--s-size)`                |
