---
title: PullDownRefresh
subtitle: 下拉刷新
group: 反馈组件
---

## 介绍

`PullDownRefresh` 提供下拉刷新的交互操作。

`PullDownRefresh` 可以在页面或滚动元素中使用，
当满足下拉刷新条件（滚动到顶部）且进行下拉操作时，会接替容器的滚动行为。

因此当滚动到顶部时调用 `PullDownRefreshExpose['enableToRefresh']` 方法并传递`true`告诉组件可以进行下拉刷新操作。

当用户下拉到指定阈值时会触发 `refresh` 事件，此时要设置 `loading` 属性为 `true` 以便向用户展示加载状态，并发送网络请求。

在获取到数据后设置 `loading` 属性为 `false` 来关闭加载状态。

`PullDownRefresh` 组件被设计为与滚动容器弱关联关系，因此，如果有需要，你可以将此组件与滚动容器以及上拉加载组件组合使用来实现复杂的效果。

## 代码演示

### 基于页面的刷新

在页面生命周期 `usePageScroll` 中获取当前 `scrollTop` 的值，当为 0 时启用下拉刷新。

<<< @demo/pull-down-refresh/demo/Page.vue

### 基于滚动元素的刷新

监听滚动元素的 `scroll` 事件来获取 `scrollTop` 值，当为 0 时启用下拉刷新。

<<< @demo/pull-down-refresh/demo/ScrollView.vue

### 自定义插槽

通过使用插槽可以自定义不同状态的提示信息。

其中 `unready` 插槽接收一个 `progress` 属性用来实现下拉进度展示的效果。

<<< @demo/pull-down-refresh/demo/Slot.vue

## API

### PullDownRefreshProps

| 属性                | 描述                          | 类型    | 默认值 |
| ------------------- | ----------------------------- | ------- | ------ |
| threshold           | 触发下拉刷新的阈值，单位 px   | number  | 50     |
| header-height       | 顶部内容高度，单位 px         | number  | 50     |
| loading             | 是否处于加载中状态            | boolean | false  |
| transition-duration | 回弹动画时长，单位 ms         | number  | 300    |
| done-duration       | 加载完成状态持续时长，单位 ms | number  | 0      |
| disabled            | 是否禁止用户进行下拉操作      | boolean | false  |

### PullDownRefreshSlots

| 插槽    | 描述                                                                               | 属性                   |
| ------- | ---------------------------------------------------------------------------------- | ---------------------- |
| default | 自定义默认内容                                                                     | -                      |
| unready | 自定义未预备加载状态内容，`progress` 属性表示从下拉开始到达到 `threshold` 的进度值 | `{ progress: number }` |
| ready   | 自定义预备加载状态内容                                                             | -                      |
| loading | 自定义加载中状态内容                                                               | -                      |
| done    | 自定义加载完成状态内容                                                             | -                      |

### PullDownRefreshEmits

| 事件    | 描述                           | 类型         |
| ------- | ------------------------------ | ------------ |
| refresh | 下拉到指定阈值并松开手指后触发 | `() => void` |

### PullDownRefreshExpose

| 属性            | 描述                                           | 类型                            |
| --------------- | ---------------------------------------------- | ------------------------------- |
| enableToRefresh | 是否启用下拉刷新，通常在容器滚动到顶部时设为真 | `(canRefresh: boolean) => void` |

## 主题定制

### 样式变量

| CSS 变量                                  | 值                             |
| ----------------------------------------- | ------------------------------ |
| `--s-pull-down-refresh-header-font-size`  | `var(--s-font-size-sm)`        |
| `--s-pull-down-refresh-header-color`      | `var(--s-text-color-tertiary)` |
| `--s-pull-down-refresh-loading-font-size` | `18px`                         |
