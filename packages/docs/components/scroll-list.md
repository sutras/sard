---
title: ScrollList
subtitle: 横向滚动列表
group: 数据展示
---

## 介绍

给横向滚动容器添加模拟滚动条，一般用于同时展示多个商品、分类列表的场景。

## 代码演示

### 基础使用

在默认插槽里编写任意内容。

<<< @demo/scroll-list/demo/Basic.vue

### 滚动条颜色

使用 `scrollbar-bg` 属性设置滚动条背景色，使用 `thumb-bg` 属性设置滑块背景色。

也可以通过 css 变量设置。

<<< @demo/scroll-list/demo/Color.vue

### 动态数据

组件内部能够通过观察滚动内容宽度变化，动态调整滑块的宽度。

<<< @demo/scroll-list/demo/Dynamic.vue

### 隐藏滚动条

如果滚动内容宽度小于滚动容器的宽度，会自动隐藏滚动条。

<<< @demo/scroll-list/demo/HideThumb.vue

## API

### ScrollListProps

| 属性            | 描述           | 类型   | 默认值 |
| --------------- | -------------- | ------ | ------ |
| scrollbar-width | 滚动条宽度     | string | -      |
| scrollbar-bg    | 滚动条的背景色 | string | -      |
| thumb-bg        | 滑块的的背景色 | string | -      |

### ScrollListSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ScrollListEmits

| 事件   | 描述       | 类型                      |
| ------ | ---------- | ------------------------- |
| scroll | 滚动时触发 | `( event: Event) => void` |

## 主题定制

### 样式变量

| CSS 变量                               | 值                              |
| -------------------------------------- | ------------------------------- |
| `--s-scroll-list-scrollbar-width`      | `50px`                          |
| `--s-scroll-list-scrollbar-height`     | `4px`                           |
| `--s-scroll-list-scrollbar-margin-top` | `var(--s-size)`                 |
| `--s-scroll-list-scrollbar-bg`         | `var(--s-fill-color-secondary)` |
| `--s-scroll-list-scrollbar-thumb-bg`   | `var(--s-color-primary)`        |
