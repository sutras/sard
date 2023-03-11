# ImagePreview 图片预览

### 介绍

图片放大预览，支持多张图片滑动切换。

### 引入

```js
import { ImagePreview } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Imperative.tsx",
    "./demo/DefaultIndex.tsx"
  ]
</script>

## API

### ImagePreviewProps

| 属性           | 描述                   | 类型                       | 默认值 |
| -------------- | ---------------------- | -------------------------- | ------ |
| images         | 图片地址列表           | string[]                   | []     |
| defaultIndex   | 默认展示的图片的下标   | number                     | 0      |
| visible        | 是否可见               | boolean                    | -      |
| defaultVisible | 是否默认可见           | boolean                    | -      |
| onVisible      | 显隐时触发             | (visible: boolean) => void | -      |
| popupProps     | `Popup` 组件的 `props` | PopupProps                 | -      |

### ImagePreview 方法

| 名称 | 描述         | 类型                                 |
| ---- | ------------ | ------------------------------------ |
| show | 显示图片预览 | (props: ImagePreviewOptions) => void |

### ImagePreviewOptions

`ImagePreviewOptions` 继承 `ImagePreviewProps`，并有以下额外属性：

| 名称 | 描述                                                                            | 类型   | 默认值         |
| ---- | ------------------------------------------------------------------------------- | ------ | -------------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'imagePreview' |

### ImagePreviewAgentProps

`ImagePreviewAgentProps` 继承 `ImagePreviewProps`，并有以下额外属性：

| 名称 | 描述    | 类型   | 默认值         |
| ---- | ------- | ------ | -------------- |
| id   | 组件 id | string | 'imagePreview' |

## 主题定制

### CSS 变量

%{variables}
