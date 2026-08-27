---
title: InfiniteList
subtitle: 无限列表
group: 数据展示
---

## 介绍

组合 `pull-down-refresh` 和 `load-more` 组件，滚动到底部自动加载更多数据。

## 代码演示

### 基础使用

默认展示加载更多功能，滚动到底部时自动加载下一页数据。`request` 函数接收页码和是否刷新两个参数，需返回 `Promise<boolean>`，`true` 表示数据已全部加载。

<<< @demo/infinite-list/demo/Basic.vue

### 开启下拉刷新

设置 `refreshable` 属性可开启下拉刷新功能。刷新时 `request` 的 `isRefresh` 参数为 `true`，此时应将列表数据重置为第一页数据。

<<< @demo/infinite-list/demo/Refresh.vue

### 数据为空

当数据为空时可配合 `Empty` 组件展示空状态，并可通过 `hide-load-more` 隐藏加载更多组件。

<<< @demo/infinite-list/demo/Empty.vue

### 弹窗中滚动

演示在弹窗中的使用。

<<< @demo/infinite-list/demo/PopupScroll.vue

## API

### InfiniteListProps

| 属性           | 描述                                                                                           | 类型                                                     | 默认值  |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------- |
| request        | 请求数据的方法，接收页码和是否刷新两个参数，返回 `Promise<boolean>`，`true` 表示数据已全部加载 | `(page: number, isRefresh: boolean) => Promise<boolean>` | -       |
| hide-load-more | 是否隐藏加载更多组件                                                                           | `boolean`                                                | `false` |
| refreshable    | 是否开启下拉刷新                                                                               | `boolean`                                                | `false` |
| done-duration  | 刷新完成后 "完成" 提示的持续时间（ms）                                                         | `number`                                                 | `0`     |
| root-margin    | 用于 IntersectionObserver 的 rootMargin 配置，控制触底加载的提前量                             | `string`                                                 | -       |

### InfiniteListSlots

| 插槽    | 描述                           | 属性                                              |
| ------- | ------------------------------ | ------------------------------------------------- |
| default | 自定义默认内容                 | `{ status: LoadMoreStatus; refresh: () => void }` |
| unready | 自定义下拉刷新未就绪状态的内容 | `{ progress: number }`                            |
| ready   | 自定义下拉刷新就绪状态的内容   | -                                                 |
| loading | 自定义下拉刷新加载中的内容     | -                                                 |
| done    | 自定义下拉刷新完成后的内容     | -                                                 |

### InfiniteListEmits

| 事件            | 描述               | 类型         |
| --------------- | ------------------ | ------------ |
| refresh-success | 下拉刷新成功时触发 | `() => void` |
| refresh-error   | 下拉刷新失败时触发 | `() => void` |

### InfiniteListExpose

| 属性    | 描述         | 类型         |
| ------- | ------------ | ------------ |
| refresh | 手动触发刷新 | `() => void` |
