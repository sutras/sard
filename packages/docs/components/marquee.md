---
title: Marquee
subtitle: 跑马灯
group: 活动组件
---

## 介绍

使用 `animation` 来实现高效的无缝滚动动画，会根据内容高度或宽度动态设置动画时长，以实现固定速率滚动。

## 代码演示

### 基础使用

当内容高度超过容器高度时，会被拷贝一份，并进行无缝滚动。

<<< @demo/marquee/demo/Basic.vue

### 水平方向

可以设置 `direction="horizontal"` 属性实现水平方向的滚动。

<<< @demo/marquee/demo/Horizontal.vue

### 动态数据

`Marquee` 实时监听内容和容器的尺寸，来决定是否滚动以及动画时长。

<<< @demo/marquee/demo/Dynamic.vue

### 国家滚动

在有限空间下需要完整展示内容时，可以通过滚动的方式来拼凑完整内容。

在下面案例案例中，当国家名称过长而超过容器宽度时，会被拷贝一份，并进行滚动。

<<< @demo/marquee/demo/Countries.vue

## API

### MarqueeProps

| 属性      | 描述            | 类型                       | 默认值     |
| --------- | --------------- | -------------------------- | ---------- |
| direction | 动画滚动方向    | 'vertical' \| 'horizontal' | 'vertical' |
| speed     | 滚动速率 (px/s) | number                     | 50         |

### MarqueeSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
