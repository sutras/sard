---
title: Indexes
subtitle: 索引
group: 导航组件
---

## 介绍

用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。

## 代码演示

### 区号选择

`Indexes` 里面的 `IndexesAnchor` 组件会被收集起来，用于放置锚点和自动生成右侧的导航。导航和锚点会有一个联动效果。

<<< @demo/indexes/demo/Basic.vue

`AreaCode.vue`

<<< @demo/indexes/demo/AreaCode.vue

`AreaCodeSearch.vue`

<<< @demo/indexes/demo/AreaCodeSearch.vue

### 全屏

<<< @demo/indexes/demo/FullPage.vue

## API

### IndexesProps

| 属性    | 描述               | 类型             | 默认值 |
| ------- | ------------------ | ---------------- | ------ |
| current | 设置当前活动的锚点 | number \| string | -      |

### IndexesSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### IndexesEmits

| 事件           | 描述               | 类型                               |
| -------------- | ------------------ | ---------------------------------- |
| update:current | 索引发生变更时触发 | `(name: number \| string) => void` |
| change         | 索引发生变更时触发 | `(name: number \| string) => void` |

### IndexesExpose

| 属性     | 描述           | 类型                               |
| -------- | -------------- | ---------------------------------- |
| scrollTo | 滚动到指定锚点 | `(name: string \| number) => void` |
| update   | 更新锚点位置   | `() => void`                       |

### IndexesAnchorProps

| 属性 | 描述                                                                               | 类型             | 默认值 |
| ---- | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| name | `name` 是用于索引导航的标识名称，不传 `default` 插槽时则显示 `name` 作为锚点内容。 | number \| string | -      |

### IndexesAnchorSlots

| 插槽    | 描述                              | 属性 |
| ------- | --------------------------------- | ---- |
| default | 自定义锚点内容，不传则显示 `name` | -    |

## 主题定制

### 样式变量

| CSS 变量                            | 值                             |
| ----------------------------------- | ------------------------------ |
| `--s-indexes-anchor-padding`        | `0 var(--s-content-padding-x)` |
| `--s-indexes-anchor-font-size`      | `var(--s-font-size)`           |
| `--s-indexes-anchor-height`         | `var(--s-size-2xl)`            |
| `--s-indexes-anchor-color`          | `var(--s-text-color-tertiary)` |
| `--s-indexes-anchor-bg`             | `var(--s-fill-color-fourth)`   |
| `--s-indexes-nav-padding-end`       | `var(--s-size-2xs)`            |
| `--s-indexes-nav-item-font-size`    | `var(--s-size-sm)`             |
| `--s-indexes-nav-item-size`         | `var(--s-size-lg)`             |
| `--s-indexes-nav-item-color`        | `var(--s-text-color-primary)`  |
| `--s-indexes-nav-item-color-active` | `var(--s-white)`               |
| `--s-indexes-nav-item-bg-active`    | `var(--s-color-primary)`       |
| `--s-indexes-hint-size`             | `var(--s-size-4xl)`            |
| `--s-indexes-hint-margin-end`       | `var(--s-size-2xs)`            |
| `--s-indexes-hint-bg`               | `var(--s-overlay)`             |
| `--s-indexes-hint-text-font-size`   | `var(--s-size-xl)`             |
| `--s-indexes-hint-text-color`       | `var(--s-white)`               |
