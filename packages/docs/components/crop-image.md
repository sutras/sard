---
title: CropImage
subtitle: 裁剪图片
group:
  title: 工具组件
  order: 7
---

## 介绍

对图片进行裁剪。

## 代码演示

### 基础使用

使用 `cropImage` 方法对图片进行裁剪。

<<< @demo/crop-image/demo/Basic.vue

### 裁剪比例

可以通过 `cropScale` 属性设置任意比例。

<<< @demo/crop-image/demo/CropScale.vue

### 修改裁剪尺寸

可以通过 `beforeCrop` 方法修改裁剪尺寸，接收实际宽高，通过返回缩放比例来修改裁剪大小。

<<< @demo/crop-image/demo/BeforeCrop.vue

## API

### CropImageProps

| 属性         | 描述                                                   | 类型                                                                 | 默认值      |
| ------------ | ------------------------------------------------------ | -------------------------------------------------------------------- | ----------- |
| visible      | 是否显示裁剪弹框                                       | boolean                                                              | false       |
| url          | 要裁剪的图片地址                                       | string                                                               | -           |
| crop-scale   | 裁剪的比例                                             | string                                                               | '1:1'       |
| type         | 导出图片类型                                           | string                                                               | 'image/png' |
| quality      | 导出图片的质量                                         | number                                                               | 0.92        |
| success      | 裁剪成功回调                                           | `(dataURL: string, info: { width: number; height: number }) => void` | -           |
| fail         | 裁剪失败回调                                           | `(err: any) => void`                                                 | -           |
| complete     | 裁剪成功或失败回调                                     | `() => void`                                                         | -           |
| cancel       | 点击取消按钮时触发                                     | `() => void`                                                         | -           |
| before-crop  | 裁剪前回调，可以修改裁剪的尺寸；接收宽高，返回缩放比例 | `(width: number, height: number) => number`                          | -           |
| cancel-text  | 取消按钮文字                                           | string                                                               | '取消'      |
| confirm-text | 确定按钮文字                                           | string                                                               | '确定'      |

### CropImageEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述             | 类型                         |
| -------------- | ---------------- | ---------------------------- |
| update:visible | 弹出框显隐时触发 | `(visible: boolean) => void` |

### 命令式方法

| 名称      | 描述     | 类型                                  |
| --------- | -------- | ------------------------------------- |
| cropImage | 裁剪图片 | `(options: CropImageOptions) => void` |
