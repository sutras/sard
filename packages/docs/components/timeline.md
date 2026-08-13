---
title: Timeline
subtitle: 时间轴
group: 数据展示
---

## 介绍

垂直展示的时间流信息。

## 代码演示

### 基础使用

<<< @demo/timeline/demo/Basic.vue

## API

### TimelineProps

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |

### TimelineSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TimelineItemProps

| 属性  | 描述     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| title | 标题内容 | string | -      |
| time  | 时间内容 | string | -      |

### TimelineItemSlots

| 插槽    | 描述                                | 属性 |
| ------- | ----------------------------------- | ---- |
| default | 自定义默认内容                      | -    |
| icon    | 自定义图标内容，会覆盖 `icon` 属性  | -    |
| title   | 自定义标题内容，会覆盖 `title` 属性 | -    |
| time    | 自定义时间内容，会覆盖 `time` 属性  | -    |

## 主题定制

### 样式变量

| CSS 变量                                      | 值                              |
| --------------------------------------------- | ------------------------------- |
| `--s-timeline-item-header-width`              | `48px`                          |
| `--s-timeline-item-line-width`                | `1px`                           |
| `--s-timeline-item-line-dotted-before-height` | `7px`                           |
| `--s-timeline-item-line-color`                | `var(--s-border-color)`         |
| `--s-timeline-item-icon-wrapper-margin-y`     | `3px`                           |
| `--s-timeline-item-icon-font-size`            | `24px`                          |
| `--s-timeline-item-icon-color`                | `var(--s-fill-color)`           |
| `--s-timeline-item-dot-size`                  | `8px`                           |
| `--s-timeline-item-dot-bg`                    | `var(--s-fill-color-secondary)` |
| `--s-timeline-item-body-padding-top`          | `3px`                           |
| `--s-timeline-item-body-padding-bottom`       | `24px`                          |
| `--s-timeline-item-title-margin-bottom`       | `6px`                           |
| `--s-timeline-item-title-font-size`           | `var(--s-font-size-lg)`         |
| `--s-timeline-item-description-margin-bottom` | `6px`                           |
| `--s-timeline-item-description-font-size`     | `var(--s-font-size)`            |
| `--s-timeline-item-time-font-size`            | `var(--s-font-size-sm)`         |
| `--s-timeline-item-time-color`                | `var(--s-text-color-tertiary)`  |
