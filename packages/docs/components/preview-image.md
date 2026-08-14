---
title: PreviewImage
subtitle: 预览图片
group: 数据展示
---

## 介绍

用于预览图片的组件，支持手势缩放、滑动切换、拖拽关闭等交互。支持组件式和命令式两种调用方式。

## 代码演示

### 基础使用

使用 `previewImage` 命令式方法，传入图片地址数组和当前索引即可预览图片。

<<< @demo/preview-image/demo/Basic.vue

## API

### PreviewImageProps

| 属性           | 描述               | 类型     | 默认值 |
| -------------- | ------------------ | -------- | ------ |
| visible        | 是否显示预览框     | boolean  | -      |
| current        | 当前图片索引       | number   | 0      |
| urls           | 图片地址数组       | string[] | []     |
| show-indicator | 是否显示分页指示器 | boolean  | true   |
| loop           | 是否启用循环滑动   | boolean  | true   |

### PreviewImageEmits

| 事件           | 描述               | 类型                         |
| -------------- | ------------------ | ---------------------------- |
| update:visible | 预览框显隐时触发   | `(visible: boolean) => void` |
| update:current | 当前图片改变时触发 | `(current: number) => void`  |

### PreviewImageSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### 命令式方法

| 名称              | 描述         | 类型                       |
| ----------------- | ------------ | -------------------------- |
| previewImage      | 显示图片预览 | `PreviewImageShowFunction` |
| previewImage.hide | 隐藏图片预览 | `() => void`               |

### PreviewImageShowFunction

```ts
interface PreviewImageShowFunction {
  (options?: PreviewImageOptions): void
}
```

### PreviewImageOptions

```ts
type PreviewImageOptions = {
  visible?: boolean
  current?: number
  urls: string[]
}
```
