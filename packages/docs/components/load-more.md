---
title: LoadMore
subtitle: 加载更多
group: 反馈组件
---

## 介绍

放置在列表底部，做滚动加载使用，展示加载的各种状态。

## 代码演示

### 状态

通过设置 `status` 属性展示不同的状态信息；有四种状态：

- `INCOMPLETE`: 未完成，处于此状态，会在触底或点击时触发 `load` 事件；
- `LOADING`: 加载中，处于此状态不会有任何交互；
- `COMPLETE`: 已完成，已经加载完所有数据，处于此状态不会有任何交互；
- `ERROR`: 加载错误，可以通过点击组件触发 `load` 事件来重试；

<<< @demo/load-more/demo/Status.vue

### 基础使用

`LoadMore` 组件会获取最近一个滚动的祖先元素，当 `LoadMore` 出现在此祖先元素中时触发 `load` 事件，可在此事件回调中加载数据。

需要处理好加载状态和页码。

<<< @demo/load-more/demo/Basic.vue

### 配合 PullDownRefresh 组件使用

下面的案例代码展示了经典的“下拉刷新+触底加载”。

在下拉刷新事件回调中重置页码；触底加载中需要禁用下拉刷新。

<<< @demo/load-more/demo/WithRefresh.vue

### 页面触底加载

当没有获取到滚动元素时，会以页面窗口作为相交容器。

<<< @demo/load-more/demo/FullPage.vue

## API

### LoadMoreProps

| 属性            | 描述                                                               | 类型           | 默认值                    |
| --------------- | ------------------------------------------------------------------ | -------------- | ------------------------- |
| status          | 加载的状态                                                         | LoadMoreStatus | LoadMoreStatus.INCOMPLETE |
| incomplete-text | 未加载完的状态文本                                                 | string         | '加载更多'                |
| loading-text    | 加载中的状态文本                                                   | string         | '加载中...'               |
| complete-text   | 加载完的状态文本                                                   | string         | '没有更多了'              |
| error-text      | 加载错误的状态文本                                                 | string         | '请求失败，点击重新加载'  |
| root-margin     | 用于 IntersectionObserver 的 rootMargin 配置，控制触底加载的提前量 | `string`       | -                         |
| disabled        | 禁用触底加载，仅用于演示                                           | boolean        | false                     |

### LoadMoreSlots

| 插槽       | 描述                                                   | 属性 |
| ---------- | ------------------------------------------------------ | ---- |
| incomplete | 自定义未加载完的状态内容，会覆盖 `incompleteText` 属性 | -    |
| loading    | 自定义加载中的状态内容，会覆盖 `loadingText` 属性      | -    |
| complete   | 自定义加载完的状态内容，会覆盖 `completeText` 属性     | -    |
| error      | 自定义加载错误的状态内容，会覆盖 `errorText` 属性      | -    |

### LoadMoreEmits

| 事件 | 描述                                              | 类型         |
| ---- | ------------------------------------------------- | ------------ |
| load | 在触底或在 `INCOMPLETE \| ERROR` 状态下点击时触发 | `() => void` |

### LoadMoreStatus

```ts
enum LoadMoreStatus {
  INCOMPLETE = 'incomplete', // 未完成
  LOADING = 'loading', // 加载中
  COMPLETE = 'complete', // 已完成
  ERROR = 'error', // 加载错误
}
```

## 主题定制

### 样式变量

| CSS 变量                  | 值                             |
| ------------------------- | ------------------------------ |
| `--s-load-more-height`    | `var(--s-size-4xl)`            |
| `--s-load-more-font-size` | `var(--s-font-size-sm)`        |
| `--s-load-more-color`     | `var(--s-text-color-tertiary)` |
