# PasswordInput 密码输入框

### 介绍

用于输入密码、验证码等场景可结合数字键盘组件或原生键盘使用。

### 引入

```ts
import { PasswordInput } from 'sard-taro'
```

## 代码演示

### 基础使用

默认可以输入 6 个字符。

%(${DEMO_PATH}/password-input/demo/Basic.tsx)

### 下划线类型

`type` 属性可以设置为 `underline` 显示为下划线类型。

%(${DEMO_PATH}/password-input/demo/Underline.tsx)

### 间距

通过 `gap` 属性来设置格子之间的间距。

%(${DEMO_PATH}/password-input/demo/Gap.tsx)

### 明文显示

将 `plainText` 设置为 `true` 可以明文展示输入的内容，适用于短信验证码等场景。

%(${DEMO_PATH}/password-input/demo/PlainText.tsx)

### 使用自定义键盘

设置 `custom` 属性可以使用自定义键盘输入，如果 `focused` 属性为真则会显示聚焦状态。

%(${DEMO_PATH}/password-input/demo/WithNumberKeyboard.tsx)

## API

### PasswordInputProps

| 属性           | 描述                       | 类型                         | 默认值   |
| -------------- | -------------------------- | ---------------------------- | -------- |
| value          | 密码输入框值               | string                       | -        |
| defaultValue   | 密码输入框默认值           | string                       | -        |
| onChange       | 密码输入框值改变时触发     | (value: string) => void      | -        |
| length         | 密码长度                   | number                       | 6        |
| type           | 密码输入框类型             | 'border' \| 'underline'      | 'border' |
| gap            | 密码输入框项间距           | number \| string             | -        |
| plainText      | 是否明文显示               | boolean                      | false    |
| focused        | 是否获取焦点               | boolean                      | false    |
| defaultFocused | 是否默认焦点               | boolean                      | false    |
| onFocused      | 获取/失去焦点时触发        | (focused: boolean) => void   | -        |
| onClick        | 点击密码输入框时触发       | (event: ITouchEvent) => void | -        |
| custom         | 是否使用自定义键盘         | boolean                      | false    |
| inputType      | 使用原生键盘时的输入框类型 | Taro InputProps['type']      | 'number' |
| disabled       | 禁用状态                   | boolean                      | false    |
| readOnly       | 只读状态                   | boolean                      | false    |

## 主题定制

### CSS 变量

%(./index.scss#variables)
