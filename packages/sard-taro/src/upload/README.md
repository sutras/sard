# Upload 上传

### 介绍

控制文件的上传及状态展示。

### 引入

```js
import { Upload } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/upload/demo/Basic.tsx)

### 上传视频

%(${DEMO_PATH}/upload/demo/Video.tsx)

### 限定上传数量

%(${DEMO_PATH}/upload/demo/MaxCount.tsx)

### 多选

%(${DEMO_PATH}/upload/demo/Multiple.tsx)

### 上传前置处理

%(${DEMO_PATH}/upload/demo/BeforeRead.tsx)

### 限定上传大小

%(${DEMO_PATH}/upload/demo/Size.tsx)

### 上传状态

%(${DEMO_PATH}/upload/demo/Status.tsx)

### 禁用

%(${DEMO_PATH}/upload/demo/DisabledReadOnly.tsx)

### 自定义选区样式

%(${DEMO_PATH}/upload/demo/CustomSelect.tsx)

## API

### UploadProps

| 属性            | 描述                                                                           | 类型                                                       | 默认值                     |
| --------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- | -------------------------- |
| accept          | 允许上传的文件类型                                                             | 'image' \| 'video'                                         | 'image'                    |
| multiple        | 是否开启图片多选                                                               | boolean                                                    | false                      |
| sourceType      | 文件选择来源                                                                   | ('album' \| 'camera')[]                                    | ['album', 'camera']        |
| compressed      | 是否压缩所选择的视频文件                                                       | boolean                                                    | true                       |
| sizeType        | 所选的图片的尺寸                                                               | ('original' \| 'compressed')[]                             | ['original', 'compressed'] |
| maxDuration     | 拍摄视频最长拍摄时间，单位秒                                                   | number                                                     | 60                         |
| camera          | 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效 | 'back' \| 'front'                                          | 'back'                     |
| maxDuration     | 拍摄视频最长拍摄时间，单位秒                                                   | number                                                     | 60                         |
| fileList        | 已上传的文件列表                                                               | UploadFileItem[]                                           | -                          |
| defaultFileList | 默认已上传的文件列表                                                           | UploadFileItem[]                                           | -                          |
| maxCount        | 文件上传数量限制                                                               | number                                                     | Number.MAX_SAFE_INTEGER    |
| maxSize         | 文件大小限制，单位为 `byte`                                                    | number \| ((file: File) => boolean)                        | Number.MAX_SAFE_INTEGER    |
| overSize        | 文件大小超过限制时触发                                                         | (previewProps: UploadFileItem \| UploadFileItem[]) => void | -                          |
| select          | 自定义选择区的内容                                                             | React.ReactNode                                            | -                          |
| disabled        | 是否禁用文件上传                                                               | boolean                                                    | false                      |
| readOnly        | 是否将上传区域设置为只读状态                                                   | boolean                                                    | false                      |
| beforeRead      | 文件读取前的回调，返回 false 可终止文件读取，支持返回 Promise                  | (file: File) => boolean \| Promise<File>                   | -                          |
| afterRead       | 文件读取完成后的回调                                                           | (previewProps: UploadFileItem \| UploadFileItem[]) => void | -                          |
| onChange        | 上传文件改变时触发                                                             | (previewPropsList: UploadFileItem[]) => void               | -                          |
| removable       | 是否可删除                                                                     | boolean                                                    | true                       |
| remove          | 自定义删除按钮                                                                 | React.ReactNode                                            | -                          |
| beforeRemove    | 文件删除前的回调，返回 false 可终止文件读取，支持返回 Promise                  | (...args: any[]) => boolean \| Promise<void>               | -                          |
| onRemove        | 删除文件预览时触发                                                             | (index: number) => void                                    | -                          |
| mode            | 图片裁剪、缩放的模式                                                           | ImageProps['mode']                                         | 'aspectFill'               |

### UploadRef

| 属性   | 描述     | 类型       |
| ------ | -------- | ---------- |
| select | 选择文件 | () => void |

### UploadFileItem

| 属性         | 描述                                                                              | 类型                                        | 默认值    |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------- | --------- |
| className    | 类名                                                                              | string                                      | -         |
| style        | 样式                                                                              | CSSProperties                               | -         |
| file         | 用户选择的文件                                                                    | UploadFile                                  | -         |
| name         | 图片和视频之外的文件要展示的文件名，如果不指定且有 `file`，则获取 `file` 的文件名 | React.ReactNode                             | -         |
| url          | 图片的 `url`                                                                      | string                                      | -         |
| status       | 指定预览图片的状态                                                                | UploadStatus                                | 'pending' |
| message      | 展示预览图片在 `uploading`, `failed` 等状态下的说明文本                           | React.ReactNode                             | -         |
| removable    | 是否可删除，会覆盖 `UploadProps['removable']`                                     | boolean                                     | true      |
| remove       | 自定义删除按钮，会覆盖 `UploadProps['remove']`                                    | React.ReactNode                             | -         |
| beforeRemove | 文件删除前的回调，会覆盖 `UploadProps['beforeRemove']`                            | (index: number) => boolean \| Promise<void> | -         |
| onRemove     | 删除文件预览时触发                                                                | (index: number) => void                     | -         |

### UploadStatus

```ts
type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'
```

### UploadFile

| 属性            | 描述                                 | 类型               | 默认值 |
| --------------- | ------------------------------------ | ------------------ | ------ |
| type            | 文件类型                             | 'image' \| 'video' | -      |
| size            | 文件大小，单位字节                   | number             | -      |
| path            | 本地临时文件路径                     | string             | -      |
| duration        | 选定视频的时间长度                   | number             | 0      |
| width           | 返回选定视频的宽度                   | number             | 0      |
| height          | 返回选定视频的高度                   | number             | 0      |
| mime            | 文件的 MIME 类型，仅 H5 支持         | string             | ''     |
| originalFileObj | 原始的浏览器 `File` 对象，仅 H5 支持 | File               | null   |

## 主题定制

### CSS 变量

%(./index.scss#variables)
