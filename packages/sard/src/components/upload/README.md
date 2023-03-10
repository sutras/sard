# Upload 上传

### 介绍

控制文件的上传及状态展示。

### 引入

```js
import { Upload } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Status.tsx",
    "./demo/MaxCount.tsx",
    "./demo/MaxSize.tsx",
    "./demo/BeforeRead.tsx",
    "./demo/Disabled.tsx",
    "./demo/ReadOnly.tsx",
    "./demo/Select.tsx",
    "./demo/Children.tsx"
  ]
</script>

## API

### UploadProps

| 属性               | 描述                                                              | 类型                                                                                             | 默认值                  |
| ------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| accept             | 允许上传的文件类型                                                | string                                                                                           | 'image/\*'              |
| multiple           | 是否开启图片多选，部分安卓机型不支持                              | boolean                                                                                          | false                   |
| capture            | 使用哪个设备捕获一个可选的新文件                                  | boolean \| 'user' \| 'environment'                                                               | -                       |
| previewList        | 已上传的文件列表                                                  | UploadPreviewProps[]                                                                             | -                       |
| defaultPreviewList | 默认已上传的文件列表                                              | UploadPreviewProps[]                                                                             | -                       |
| maxCount           | 文件上传数量限制                                                  | number                                                                                           | Number.MAX_SAFE_INTEGER |
| maxSize            | 文件大小限制，单位为 `byte`                                       | number \| ((file: File) => boolean)                                                              | Number.MAX_SAFE_INTEGER |
| overSize           | 文件大小超过限制时触发                                            | (previewProps: UploadProps['multiple'] extends true ? UploadFileItem[] : UploadFileItem) => void | -                       |
| select             | 自定义选择区的内容                                                | React.ReactNode                                                                                  | -                       |
| resultType         | 文件读取结果类型                                                  | 'file' \| 'dataUrl' \| 'text'                                                                    | 'dataUrl'               |
| disabled           | 是否禁用文件上传                                                  | boolean                                                                                          | false                   |
| readOnly           | 是否将上传区域设置为只读状态                                      | boolean                                                                                          | false                   |
| beforeRead         | 文件读取前的回调函数，返回 false 可终止文件读取，支持返回 Promise | (file: File) => boolean \| Promise<File>                                                         | -                       |
| afterRead          | 文件读取完成后的回调函数                                          | (previewProps: UploadProps['multiple'] extends true ? UploadFileItem[] : UploadFileItem) => void | -                       |
| onChange           | 上传文件改变时触发                                                | (previewPropsList: UploadPreviewProps[]) => void                                                 | -                       |
| removable          | 是否可删除                                                        | boolean                                                                                          | true                    |
| remove             | 自定义删除按钮                                                    | React.ReactNode                                                                                  | -                       |
| beforeRemove       | 文件删除前的回调函数，返回 false 可终止文件读取，支持返回 Promise | (...args: any[]) => boolean \| Promise<void>                                                     | -                       |
| onRemove           | 删除文件预览时触发                                                | (index: number) => void                                                                          | -                       |

## 主题定制

### SCSS

```scss

```
