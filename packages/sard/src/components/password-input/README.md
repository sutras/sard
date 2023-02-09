# PasswordInput 密码输入框

### 介绍

用于输入密码、验证码等场景可结合数字键盘组件或原生键盘使用。

### 引入

```js
import { PasswordInput } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Native.tsx",
    "./demo/Underline.tsx",
    "./demo/Gap.tsx",
    "./demo/PlainText.tsx"
  ]
</script>

## API

### PasswordInputProps

| 属性           | 描述                   | 类型                              | 默认值   |
| -------------- | ---------------------- | --------------------------------- | -------- |
| value          | 密码输入框值           | string                            | -        |
| defaultValue   | 密码输入框默认值       | string                            | -        |
| onChange       | 密码输入框值改变时触发 | (value: string) => void           | -        |
| length         | 密码长度               | number                            | 6        |
| type           | 密码输入框类型         | 'border' \| 'underline'           | 'border' |
| gap            | 密码输入框项间距       | number \| string                  | -        |
| plainText      | 是否明文显示           | boolean                           | false    |
| native         | 是否使用原生键盘       | boolean                           | false    |
| focused        | 是否获取焦点           | boolean                           | false    |
| defaultFocused | 是否默认焦点           | boolean                           | false    |
| onFocused      | 获取/失去焦点时触发    | (focused: boolean) => void        | -        |
| onClick        | 点击密码输入框时触发   | (event: React.MouseEvent) => void | -        |

## 主题定制

### SCSS

```scss

```
