# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码或验证码等场景。

### 引入

```ts
import { NumberKeyboard } from 'sard-taro'
```

## 代码演示

### 默认键盘

展示 0-9 的数字按键和删除按键。

%(${DEMO_PATH}/number-keyboard/demo/Basic.tsx)

### 小数点键盘

使用 `extraKey` 属性配置额外键为小数点。

%(${DEMO_PATH}/number-keyboard/demo/Dot.tsx)

### 身份证键盘

身份证号码除了 0-9 外，还由 X 组成。

%(${DEMO_PATH}/number-keyboard/demo/IdCard.tsx)

### 随机数字键盘

设置 `random` 属性可以打乱数字。

%(${DEMO_PATH}/number-keyboard/demo/Random.tsx)

### 配合密码输入框使用

`NumberKeyboard` 搭配 `PasswordInput` 适用于安全等级较高的场景。

%(${DEMO_PATH}/number-keyboard/demo/WithPasswordInput.tsx)

## API

### NumberKeyboardProps

| 属性     | 描述                 | 类型                  | 默认值 |
| -------- | -------------------- | --------------------- | ------ |
| onInput  | 可输入按键点击时触发 | (key: string) => void | -      |
| onDelete | 点击删除按钮时触发   | () => void            | -      |
| extraKey | 自定义额外键的值     | string                | -      |
| random   | 是否打乱按键         | boolean               | false  |

## 主题定制

### CSS 变量

%(./index.scss#variables)
