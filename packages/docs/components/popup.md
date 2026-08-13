---
title: Popup
subtitle: 弹出层
group: 数据展示
---

## 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。后弹出的弹出层总是比之前的层级要大。

## 代码演示

### 基础使用

使用 `visible` 控制显隐，使用 `effect` 控制显隐效果。

<<< @demo/popup/demo/Basic.vue

## API

### PopupProps

| 属性             | 描述                                           | 类型        | 默认值 |
| ---------------- | ---------------------------------------------- | ----------- | ------ |
| visible          | 是否可见                                       | boolean     | false  |
| effect           | 显隐效果                                       | PopupEffect | 'fade' |
| overlay          | 是否显示遮罩                                   | boolean     | true   |
| overlay-class    | 添加到遮罩的类名                               | string      | -      |
| overlay-style    | 添加到遮罩的样式                               | string      | -      |
| background       | 遮罩背景色                                     | string      | -      |
| transparent      | 透明遮罩                                       | boolean     | false  |
| overlay-closable | 是否在点击遮罩层后关闭                         | boolean     | true   |
| lock-scroll      | 弹出框显示时，是否阻止页面滚动                 | boolean     | true   |
| lazy             | 是否延迟渲染弹窗内容（在弹窗初次显示时才渲染） | boolean     | true   |
| destroy-on-close | 在关闭弹窗时是否销毁内容                       | boolean     | false  |

### PopupEffect

```ts
type PopupEffect =
  | 'slide-top'
  | 'slide-right'
  | 'slide-bottom'
  | 'slide-left'
  | 'zoom'
  | 'fade'
  | 'full-fade'
```

### PopupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### PopupEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述           | 类型                          |
| -------------- | -------------- | ----------------------------- |
| overlay-click  | 点击遮罩时触发 | `(event: MouseEvent) => void` |
| update:visible | 显隐时触发     | `(visible: boolean) => void`  |
