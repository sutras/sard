---
title: Motion
subtitle: 过渡动画
group: 其他
---

## 介绍

对 vue `transition` 组件进行封装，内置多种动画。

## 代码演示

### 基础使用

用法同 `transition`，通过 `name` 属性使用不同的内置动画。

<<< @demo/scroll-spy/demo/Basic.vue

## API

### MotionProps

| 属性     | 描述             | 类型                                                                                        | 默认值 |
| -------- | ---------------- | ------------------------------------------------------------------------------------------- | ------ |
| name     | 当前绑定锚点名称 | 'fade'\| 'zoom'\| 'wide-zoom'\| 'slide-top'\| 'slide-right'\| 'slide-bottom'\| 'slide-left' | 'fade' |
| disalbed | 是否禁用动画     | boolean                                                                                     | false  |

### MotionSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### MotionEmits

| 事件            | 描述                        | 类型                                          |
| --------------- | --------------------------- | --------------------------------------------- |
| visible-hook    | 入场/退场动画状态改变时触发 | `(name: MotionHookName, el: Element) => void` |
| before-enter    | 入场动画开始前触发          | `(el: Element) => void`                       |
| enter           | 入场动画开始时触发          | `(el: Element) => void`                       |
| after-enter     | 入场动画结束时触发          | `(el: Element) => void`                       |
| enter-cancelled | 入场动画取消时触发          | `(el: Element) => void`                       |
| before-leave    | 退场动画开始前触发          | `(el: Element) => void`                       |
| leave           | 退场动画开始时触发          | `(el: Element) => void`                       |
| after-leave     | 退场动画结束时触发          | `(el: Element) => void`                       |
| leave-cancelled | 退场动画取消时触发          | `(el: Element) => void`                       |

### MotionHookName

```ts
type MotionHookName =
  | 'before-enter'
  | 'enter'
  | 'after-enter'
  | 'enter-cancelled'
  | 'before-leave'
  | 'leave'
  | 'after-leave'
  | 'leave-cancelled'
```
