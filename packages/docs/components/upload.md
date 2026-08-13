---
title: Upload
subtitle: 上传
group: 表单组件
---

## 介绍

控制文件的上传及状态展示。

## 代码演示

### 基础使用

选择文件后通过 `afterRead` 将文件上传到服务器。期间通过 `UploadFileItem['status']` 和 `UploadFileItem['message']` 修改上传的状态。

<<< @demo/upload/demo/Basic.vue

### 上传视频

默认只能选择图片，可以设置 `media-type="video"` 来选择上传视频。

<<< @demo/upload/demo/Video.vue

### 同时上传图片和视频

设置 `:media-type="['image', 'video']"` 允许同时选择图片和视频。

<<< @demo/upload/demo/Mix.vue

### 限定上传数量

通过 `maxCount` 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏选择区域。

<<< @demo/upload/demo/MaxCount.vue

### 多选

默认一次只能选择一张图片，设置 `multiple` 允许图片多选。

<<< @demo/upload/demo/Multiple.vue

### 选择文件前置处理

通过传入 `beforeChoose` 函数可以在选择之前做处理，接受当前文件列表和 `next` 函数作参数，调用 `next(true)` 允许选择，调用 `next(false)` 不允许选择，也可传入一个配置对象自定义选择。

<<< @demo/upload/demo/BeforeChoose.vue

### 上传前置处理

通过传入 `beforeRead` 函数可以在上传前进行校验和处理，返回 `true` 表示校验通过，返回 `false` 表示校验失败。支持返回 `Promise` 对 `file` 对象进行自定义处理。

<<< @demo/upload/demo/BeforeRead.vue

### 限定上传大小

通过 `maxSize` 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 `overSize` 事件获取。

<<< @demo/upload/demo/Size.vue

### 上传状态

通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，`done` 表示上传完成。

<<< @demo/upload/demo/Status.vue

### 重传与取消

利用 `item-click` 事件可实现重传与取消。

<<< @demo/upload/demo/ReuploadCancel.vue

### 只读和禁用

只读会隐藏选择区域，禁用则不允许用户点击选择。

<<< @demo/upload/demo/DisabledReadOnly.vue

### 自定义选区样式

使用 `select` 插槽自定义选区内容。

<<< @demo/upload/demo/CustomSelect.vue

### 自定义渲染

使用默认插槽自定义渲染内容。

`list` 参数用于渲染文件列表；`onSelect` 用于选择文件；`onRemove` 用于删除文件；`onImageClick` 用于预览图片。

<<< @demo/upload/demo/Custom.vue

## API

### UploadProps

| 属性           | 描述                                                                                                   | 类型                                                                                            | 默认值                  |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------- |
| media-type     | 允许上传的文件类型                                                                                     | 'image' \| 'video' \| ('image' \| 'video' )[]                                                   | 'image'                 |
| multiple       | 是否开启图片多选                                                                                       | boolean                                                                                         | false                   |
| capture        | 使用设备的媒体捕获数据，还是请求文件输入                                                               | 'environment' \| 'user'                                                                         | -                       |
| model-value    | 已上传的文件列表                                                                                       | UploadFileItem[]                                                                                | -                       |
| max-count      | 文件上传数量限制                                                                                       | number                                                                                          | Number.MAX_SAFE_INTEGER |
| max-size       | 文件大小限制，单位为 `byte`                                                                            | `number \| ((file: File) => boolean)`                                                           | Number.MAX_SAFE_INTEGER |
| over-size      | 文件大小超过限制时触发                                                                                 | `(fileItem:  UploadFileItem[]) => void`                                                         | -                       |
| disabled       | 是否禁用文件上传                                                                                       | boolean                                                                                         | false                   |
| readonly       | 是否将上传区域设置为只读状态                                                                           | boolean                                                                                         | false                   |
| before-choose  | 文件选择前的回调，接受当前文件列表和 `next` 函数作参数，接收布尔类型表示是否允许选择，也可传入配置对象 | `(fileList: UploadFileItem[], next: (allowed: boolean \| UploadSelectOptions) => void) => void` | -                       |
| before-read    | 文件读取前的回调，返回 false 可终止文件读取，支持返回 Promise                                          | `(file: File) => boolean \| Promise<void>`                                                      | -                       |
| after-read     | 文件读取完成后的回调                                                                                   | `(fileItem: UploadFileItem \| UploadFileItem[]) => void`                                        | -                       |
| removable      | 是否可删除                                                                                             | boolean                                                                                         | true                    |
| before-remove  | 文件删除前的回调，返回 false 可终止文件删除，支持返回 Promise                                          | `(index: number, fileItem: UploadFileItem) => boolean \| Promise<any>`                          | -                       |
| validate-event | 是否触发表单验证                                                                                       | boolean                                                                                         | true                    |

### UploadSelectOptions

```ts
interface UploadSelectOptions {
  capture?: 'environment' | 'user'
}
```

### UploadSlots

| 插槽    | 描述           | 属性                                                                                                                                              |
| ------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | 自定义渲染     | `{ list: UploadFileItem[]; onSelect: () => void; onRemove: (index: number, item: UploadFileItem) => void; onImageClick: (index: number) => void}` |
| select  | 自定义选取内容 | -                                                                                                                                                 |

### UploadEmits

| 事件              | 描述                     | 类型                                            |
| ----------------- | ------------------------ | ----------------------------------------------- |
| update:modelValue | 选择的文件列表改变时触发 | `(value: UploadFileItem[]) => void`             |
| change            | 选择的文件列表改变时触发 | `(value: UploadFileItem[]) => void`             |
| remove            | 删除文件时触发           | `(index: number, item: UploadFileItem) => void` |
| item-click        | 点击文件项时触发         | `(item: UploadFileItem, index: number) => void` |

### UploadExpose

| 属性   | 描述             | 类型         |
| ------ | ---------------- | ------------ |
| select | 手动调起文件选择 | `() => void` |

### UploadFileItem

| 属性     | 描述                                                                              | 类型         | 默认值    |
| -------- | --------------------------------------------------------------------------------- | ------------ | --------- |
| file     | 用户选择的文件                                                                    | File         | -         |
| name     | 图片和视频之外的文件要展示的文件名，如果不指定且有 `file`，则获取 `file` 的文件名 | string       | -         |
| url      | 图片的 `url`                                                                      | string       | -         |
| is-image | 当无法从 `url` 中判断为图片时，可以显式指定为图片，以便可以对图片进行预览         | boolean      | false     |
| is-video | 当无法从 `url` 中判断为视频时，可以显式指定为视频，以便可以对视频进行预览         | boolean      | false     |
| status   | 指定预览图片的状态                                                                | UploadStatus | 'pending' |
| message  | 展示预览图片在 `uploading`, `failed` 等状态下的说明文本                           | string       | -         |

### UploadStatus

```ts
type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'
```

## 主题定制

### 样式变量

| CSS 变量                               | 值                              |
| -------------------------------------- | ------------------------------- |
| `--s-upload-preview-width`             | `88px`                          |
| `--s-upload-preview-height`            | `88px`                          |
| `--s-upload-preview-gap`               | `var(--s-size-xs)`              |
| `--s-upload-preview-border-radius`     | `var(--s-border-radius)`        |
| `--s-upload-preview-bg`                | `var(--s-fill-color-secondary)` |
| `--s-upload-preview-video-bg`          | `var(--s-black)`                |
| `--s-upload-file-color`                | `var(--s-text-color-primary)`   |
| `--s-upload-file-icon-font-size`       | `var(--s-size-lg)`              |
| `--s-upload-file-name-margin-top`      | `var(--s-size-2xs)`             |
| `--s-upload-file-name-padding-x`       | `var(--s-size-2xs)`             |
| `--s-upload-file-name-font-size`       | `var(--s-font-size-sm)`         |
| `--s-upload-status-color`              | `var(--s-white)`                |
| `--s-upload-status-bg`                 | `var(--s-overlay-illegible)`    |
| `--s-upload-status-icon-font-size`     | `var(--s-size-lg)`              |
| `--s-upload-status-message-margin-top` | `var(--s-size-2xs)`             |
| `--s-upload-status-message-padding-x`  | `var(--s-size-2xs)`             |
| `--s-upload-status-message-font-size`  | `var(--s-font-size-sm)`         |
| `--s-upload-close-top`                 | `2px`                           |
| `--s-upload-close-right`               | `2px`                           |
| `--s-upload-close-size`                | `var(--s-size-lg)`              |
| `--s-upload-close-font-size`           | `var(--s-font-size-sm)`         |
| `--s-upload-close-color`               | `var(--s-white)`                |
| `--s-upload-close-bg`                  | `var(--s-overlay-illegible)`    |
| `--s-upload-select-width`              | `88px`                          |
| `--s-upload-select-height`             | `88px`                          |
| `--s-upload-select-font-size`          | `var(--s-size-xl)`              |
| `--s-upload-select-color`              | `var(--s-text-color-secondary)` |
| `--s-upload-select-radius`             | `var(--s-border-radius)`        |
| `--s-upload-select-bg`                 | `var(--s-fill-color-secondary)` |
| `--s-upload-select-bg-active`          | `var(--s-bg-color-active-dark)` |
| `--s-upload-video-play-bg`             | `var(--s-overlay-legible)`      |
| `--s-upload-video-play-color`          | `rgba(var(--s-white-rgb), 0.8)` |
| `--s-upload-loading-size`              | `var(--s-size-lg)`              |
