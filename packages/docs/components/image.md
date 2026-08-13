---
title: Image
subtitle: 图片
group: 基础组件
---

## 介绍

image 组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。

## 代码演示

### 基础使用

配置图片的 `width` 宽和 `height` 高，以及 `src` 路径即可使用。

<<< @demo/image/demo/Basic.vue

### 图片模式

使用 `mode` 设置图片裁剪、缩放的模式。

<<< @demo/image/demo/Mode.vue

### 图片形状

通过 `shape` 参数设置图片的形状，`circle` 为圆形，`square` 为方形
如果为方形时，还可以通过 `radius` 属性设置圆角值。

<<< @demo/image/demo/Shape.vue

### 懒加载

设置 `loading` 属性为 `lazy` 可懒加载图片。

<<< @demo/image/demo/LazyLoad.vue

### 加载中提示

加载时会显示默认的加载图标，可使用 `show-loading` 设置是否显示加载中图标，也可以使用 `loading` 插槽自定义加载内容。

<<< @demo/image/demo/Loading.vue

### 加载错误提示

加载失败时会显示默认的失败图标，可使用 `show-error` 设置是否显示加载失败图标，也可以使用 `error` 插槽自定义加载失败内容。

<<< @demo/image/demo/Error.vue

### 淡入动画

组件自带了加载完成时的淡入动画效果，通过 `fade` 属性配置是否开启动画效果。

<<< @demo/image/demo/Fade.vue

## API

### ImageProps

| 属性         | 描述                                   | 类型                                                                                                                                                                                            | 默认值       |
| ------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| src          | 图片资源地址                           | string                                                                                                                                                                                          | -            |
| mode         | 图片裁剪、缩放模式                     | 'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix' \| 'top' \| 'bottom' \| 'center' \| 'left' \| 'right' \| 'top left' \| 'top right' \| 'bottom left' \| 'bottom right' | 'aspectFill' |
| loading      | 图片加载方式                           | 'eager' \| 'lazy'                                                                                                                                                                               | 'eager'      |
| fade         | 是否需要淡入效果                       | boolean                                                                                                                                                                                         | true         |
| width        | 图片宽度                               | string                                                                                                                                                                                          | -            |
| height       | 图片高度                               | string                                                                                                                                                                                          | -            |
| shape        | 图片形状                               | 'circle' \| 'square'                                                                                                                                                                            | 'square'     |
| radius       | 图片圆角                               | string                                                                                                                                                                                          | -            |
| show-loading | 是否显示加载中的图标或者自定义的插槽   | boolean                                                                                                                                                                                         | true         |
| show-error   | 是否显示加载失败的图标或者自定义的插槽 | boolean                                                                                                                                                                                         | true         |
| background   | 图片背景颜色                           | string                                                                                                                                                                                          | -            |
| custom-load  | 自定义加载图片的方法                   | `(callback: (event: Event) => void) => any`                                                                                                                                                     | -            |

### ImageSlots

| 插槽    | 描述                 | 属性 |
| ------- | -------------------- | ---- |
| loading | 自定义加载中的内容   | -    |
| error   | 自定义加载失败的内容 | -    |

### ImageEmits

| 事件  | 描述               | 类型                          |
| ----- | ------------------ | ----------------------------- |
| click | 点击图片时触发     | `(event: MouseEvent) => void` |
| load  | 图片加载成功时触发 | `(event: Event) => void`      |
| error | 图片加载失败时触发 | `(event: Event) => void`      |

## 主题定制

### 样式变量

| CSS 变量                      | 值                             |
| ----------------------------- | ------------------------------ |
| `--s-image-bg`                | `var(--s-fill-color-tertiary)` |
| `--s-image-width`             | `320px`                        |
| `--s-image-height`            | `240px`                        |
| `--s-image-loading-font-size` | `var(--s-size-xl)`             |
| `--s-image-loading-color`     | `var(--s-text-color-fourth)`   |
| `--s-image-error-font-size`   | `var(--s-size-xl)`             |
| `--s-image-error-color`       | `var(--s-text-color-fourth)`   |
| `--s-image-duration`          | `var(--s-duration-slow)`       |
