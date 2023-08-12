# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码或验证码等场景。

### 引入

```js
import { NumberKeyboard } from 'sard-taro'
```

## 代码演示

### 默认键盘

%(${DEMO_PATH}/number-keyboard/demo/Basic.tsx)

### 小数点键盘

%(${DEMO_PATH}/number-keyboard/demo/Dot.tsx)

### 身份证键盘

%(${DEMO_PATH}/number-keyboard/demo/IdCard.tsx)

### 随机数字键盘

%(${DEMO_PATH}/number-keyboard/demo/Random.tsx)

### 配合密码输入框使用

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
