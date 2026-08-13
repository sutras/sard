---
title: Pagination
subtitle: 分页
group: 导航组件
---

## 介绍

用于分割长列表，每次加载一页数据。

## 代码演示

### 基础使用

设置 `total` 属性后便会渲染出页码。

<<< @demo/pagination/demo/Basic.vue

### 显示省略号

设置 `ellipsis` 会显示省略号，默认点击省略号会向前或向后 5 页。

<<< @demo/pagination/demo/Ellipsis.vue

### 简单分页

设置 `type="simple"` 属性可以隐藏具体的页码。

<<< @demo/pagination/demo/Simple.vue

### 自定义

自定义前后按钮内容。

<<< @demo/pagination/demo/Custom.vue

## API

### PaginationProps

| 属性              | 描述                 | 类型                | 默认值  |
| ----------------- | -------------------- | ------------------- | ------- |
| total             | 总记录数             | number              | 0       |
| page-size         | 每页记录数           | number              | 10      |
| current           | 当前页码             | number              | 1       |
| page-count        | 总页数，默认自动计算 | number              | -       |
| page-button-count | 显示的页码按钮个数   | number              | 5       |
| type              | 分页类型             | 'simple' \| 'multi' | 'multi' |
| ellipsis          | 是否显示省略号       | boolean             | false   |
| multi-count       | 点击省略号跳转的页数 | number              | 5       |

### PaginationSlots

| 插槽 | 描述                 | 属性 |
| ---- | -------------------- | ---- |
| prev | 自定义上一页按钮内容 | -    |
| next | 自定义下一页按钮内容 | -    |

### PaginationEmits

| 事件           | 描述           | 类型                     |
| -------------- | -------------- | ------------------------ |
| update:current | 页码改变时触发 | `(page: number) => void` |
| change         | 页码改变时触发 | `(page: number) => void` |

## 主题定制

### 样式变量

| CSS 变量                              | 值                           |
| ------------------------------------- | ---------------------------- |
| `--s-pagination-radius`               | `var(--s-border-radius)`     |
| `--s-pagination-border-color`         | `var(--s-border-color)`      |
| `--s-pagination-item-height`          | `var(--s-content-height-sm)` |
| `--s-pagination-item-min-width`       | `var(--s-content-height-sm)` |
| `--s-pagination-item-padding-x`       | `var(--s-size-xs)`           |
| `--s-pagination-item-font-size`       | `var(--s-font-size)`         |
| `--s-pagination-item-color`           | `var(--s-color-primary)`     |
| `--s-pagination-item-bg-active`       | `var(--s-bg-color-active)`   |
| `--s-pagination-item-color-current`   | `var(--s-white)`             |
| `--s-pagination-border-color-current` | `var(--s-color-primary)`     |
| `--s-pagination-item-bg-current`      | `var(--s-color-primary)`     |
| `--s-pagination-ratio-height`         | `var(--s-content-height-sm)` |
| `--s-pagination-ratio-font-size`      | `var(--s-font-size)`         |
