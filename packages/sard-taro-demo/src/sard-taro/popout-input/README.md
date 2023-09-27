# PopoutInput 弹出式输入框

### 介绍

以弹出框的形式来连接表单控件和输入框。自定义了输入框样式，简化了 `Popout` 的使用。

### 引入

```ts
import { PopoutInput } from 'sard-taro'
```

## 代码演示

### 基础使用

`PopoutInput` 会代理表单组件的值，并在点击确定按钮后修改输入框的值。

%(${DEMO_PATH}/popout-input/demo/Basic.tsx)

## API

### PopoutInputProps

| 属性           | 描述                       | 类型                       | 默认值     |
| -------------- | -------------------------- | -------------------------- | ---------- |
| value          | 弹出式输入框的值           | any                        | -          |
| defaultValue   | 弹出式输入框的默认值       | any                        | -          |
| onChange       | 弹出式输入框的值改变时触发 | (value: any) => void       | -          |
| trigger        | 表单组件值改变时的回调名   | string                     | 'onChange' |
| valuePropName  | 表单组件值的属性           | string                     | 'value'    |
| inputProps     | `Input` 组件的 `props`     | InputProps                 | -          |
| disabled       | 禁用状态                   | boolean                    | false      |
| readOnly       | 只读状态                   | boolean                    | false      |
| visible        | 是否显示弹出框             | boolean                    | -          |
| defaultVisible | 默认是否显示弹出框         | boolean                    | -          |
| onVisible      | 弹出框显隐时触发           | (visible: boolean) => void | -          |
| title          | 弹出框标题                 | React.ReactNode            | -          |

## 主题定制

### CSS 变量

%(./index.scss#variables)
