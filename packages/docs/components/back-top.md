---
title: BackTop
subtitle: 回到顶部
group:
  title: 导航组件
  order: 4
---

## 介绍

返回页面顶部的操作按钮。

## 代码演示

### 基础使用

返回页面顶部时，`BackTop` 组件需要配合 `usePageBackTop` 组合式函数使用。

`BackTop` 组件需要绑定 `usePageBackTop` 返回的 `scrollTop` 属性值和 `onClick` 回调。

<<< @demo/back-top/demo/Basic.vue

### scroll-view 组件滚动

返回 `scroll-view` 顶部时，`BackTop` 组件需要配合 `useElementBackTop` 组合式函数使用。

`BackTop` 组件需要绑定 `useElementBackTop` 返回的 `scrollTop` 属性值和 `onClick` 回调。

`scroll-view` 组件需要绑定 `useElementBackTop` 返回的 `scrollTop` 属性值和 `onScroll` 回调。

<<< @demo/back-top/demo/ScrollView.vue

### 按钮位置

通过设置 `right` 和 `bottom` 属性可以自定义按钮距离右下角的距离。

<<< @demo/back-top/demo/Position.vue

### 滚动时长

`usePageBackTop` 组合式函数可以接收一个数值类型参数，表示滚动到页面顶部的动画时长。

`scroll-view` 默认没有滚动动画，通过设置 `scroll-with-animation` 属性可以添加滚动动画。

<<< @demo/back-top/demo/Duration.vue

### 可见时的高度

默认情况下，当页面或 `scroll-view` 滚动到一定距离时，按钮才会显示。

可以设置 `visible-height` 为 0 让按钮一直显示。

<<< @demo/back-top/demo/VisibleHeight.vue

### 自定义按钮内容

使用默认插槽自定义组件展示的内容。

<<< @demo/back-top/demo/CustomContent.vue

## API

### BackTopProps

| 属性           | 描述                                                  | 类型   | 默认值 |
| -------------- | ----------------------------------------------------- | ------ | ------ |
| scroll-top     | 当前页面或 scroll-view 滚动的高度                     | number | 0      |
| visible-height | 回到顶部按钮显示时的页面或 scroll-view 滚动的最小高度 | number | 200    |
| right          | 回到顶部按钮距离右边的距离                            | string | -      |
| bottom         | 回到顶部按钮距离底部的距离                            | string | -      |

### BackTopSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### BackTopEmits

| 事件  | 描述       | 类型                          |
| ----- | ---------- | ----------------------------- |
| click | 点击时触发 | `(event: MouseEvent) => void` |

### usePageBackTop

```ts
function usePageBackTop(behavior?: ScrollBehavior): {
  scrollTop: Ref<number, number>
  backTop: () => void
}
```

| 参数     | 描述     | 类型           | 默认值   |
| -------- | -------- | -------------- | -------- |
| behavior | 滚动行为 | ScrollBehavior | 'smooth' |

| 返回对象的属性 | 描述                                            | 类型         |
| -------------- | ----------------------------------------------- | ------------ |
| scrollTop      | 需要绑定到 `BackTop` 组件 `scroll-top` 属性的值 | Ref\<number> |
| backTop        | 需要绑定到 `BackTop` 组件 `click` 事件的回调    | `() => void` |

### useElementBackTop

```ts
function useElementBackTop(
  el: Ref<HTMLElement | null | undefined, HTMLElement | null | undefined>,
): {
  scrollTop: Ref<number, number>
  backTop: () => void
}
```

| 返回对象的属性 | 描述                                            | 类型         |
| -------------- | ----------------------------------------------- | ------------ |
| scrollTop      | 需要绑定到 `BackTop` 组件 `scroll-top` 属性的值 | Ref\<number> |
| backTop        | 需要绑定到 `BackTop` 组件 `click` 事件的回调    | `() => void` |
