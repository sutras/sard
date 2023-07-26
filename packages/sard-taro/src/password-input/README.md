# PasswordInput 密码输入框

### 介绍

用于输入密码、验证码等场景可结合数字键盘组件或原生键盘使用。

### 引入

```js
import { PasswordInput } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
const [value, setValue] = useState('')
```

```tsx
<PasswordInput value={value} onChange={setValue} />
```

### 使用自定义键盘

```tsx
const [value, setValue] = useState('')
const [visible, setVisible] = useState(false)
```

```tsx
<PasswordInput
  custom
  focused={visible}
  value={value}
  onChange={setValue}
  onClick={() => setVisible(true)}
/>

<NumberKeyboard
  onInput={(key) => setValue((value) => value + key)}
  onDelete={() => setValue((value) => value.slice(0, -1))}
  visible={visible}
  onVisible={setVisible}
/>
```

### 下划线类型

```tsx
<PasswordInput type="underline" />
```

### 间距

```tsx
<PasswordInput gap={0} />
```

### 明文显示

```tsx
<PasswordInput plainText />
```

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
| custom         | 是否使用自定义键盘         | boolean                      | false    |
| inputType      | 使用原生键盘时的输入框类型 | Taro InputProps['type']      | 'number' |
| focused        | 是否获取焦点               | boolean                      | false    |
| defaultFocused | 是否默认焦点               | boolean                      | false    |
| onFocused      | 获取/失去焦点时触发        | (focused: boolean) => void   | -        |
| onClick        | 点击密码输入框时触发       | (event: ITouchEvent) => void | -        |
| disabled       | 禁用状态                   | boolean                      | false    |
| readOnly       | 只读状态                   | boolean                      | false    |

## 主题定制

### CSS 变量

%{variables}
