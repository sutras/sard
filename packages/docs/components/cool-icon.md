---
title: CoolIcon
subtitle: 酷炫图标
group: 数据展示
---

## 介绍

为一般的图标添加颜色、外框、背景和装饰物等元素，让其变得炫酷，可在缺少设计时也能展示不一般的效果。

## 代码演示

### 椭圆

把图标放置在默认插槽，使用 `background` 属性设置外框背景色，使用 `color` 属性设置图标颜色，使用 `shape="oval"` 属性设置外框为椭圆形，就能得到一个精致漂亮的图标。

<<< @demo/cool-icon/demo/Oval.vue

### 圆形

使用 `shape="circle"` 属性设置外框为圆形。

<<< @demo/cool-icon/demo/Circle.vue

### 方形

使用 `shape="square"` 属性设置外框为方形。

<<< @demo/cool-icon/demo/Square.vue

### 三角形

使用 `shape="triangle"` 属性设置外框为三角形。

<<< @demo/cool-icon/demo/Triangle.vue

### 花朵

使用 `shape="flower"` 属性设置外框为花朵形状。

<<< @demo/cool-icon/demo/Flower.vue

### 尺寸

使用 `size` 属性设置外框尺寸，使用 `icon-size` 设置图标尺寸。

<<< @demo/cool-icon/demo/Size.vue

## API

### CoolIconProps

| 属性       | 描述               | 类型                                                     | 默认值 |
| ---------- | ------------------ | -------------------------------------------------------- | ------ |
| shape      | 设置外框的形状     | 'circle' \| 'square' \| 'oval' \| 'triangle' \| 'flower' | 'oval' |
| color      | 设置图标颜色       | string                                                   | -      |
| background | 设置外框背景色颜色 | string                                                   | -      |
| size       | 设置外框尺寸       | string                                                   | -      |
| icon-size  | 设置图标尺寸       | string                                                   | -      |

### CoolIconSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### 样式变量

| CSS 变量                        | 值                                |
| ------------------------------- | --------------------------------- |
| `--s-cool-icon-size`            | `50px`                            |
| `--s-cool-icon-icon-size`       | `30px`                            |
| `--s-cool-icon-oval-radius`     | `43% 57% / 57% 43%`               |
| `--s-cool-icon-square-radius`   | `25%`                             |
| `--s-cool-icon-triangle-radius` | `68% 32% 40% 60%/44% 34% 66% 56%` |
| `--s-cool-icon-shadow-opacity`  | `0.4`                             |
| `--s-cool-icon-adorn-bg`        | `rgba(255, 255, 255, 0.2)`        |
