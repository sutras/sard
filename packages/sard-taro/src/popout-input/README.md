# PopoutInput 弹出式输入框

### 介绍

以弹出框的形式来连接表单控件和输入框。自定义了输入框样式，简化了 `Popout` 的使用。

### 引入

```js
import { PopoutInput } from 'sard-taro'
```

## 代码演示

%(${DEMO_PATH}/popout-input/demo/Basic.tsx)

## API

### PopoutInputProps

`PopoutInputProps`继承`PopoutProps`，并拥有以下的属性。

| 属性       | 描述                | 类型                | 默认值 |
| ---------- | ------------------- | ------------------- | ------ |
| inputProps | 输入框组件的`props` | InputProps          | -      |
| children   | 表单组件            | React.sReactElement | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
