---
title: Keyboard
subtitle: 键盘
group: 表单组件
---

## 介绍

虚拟键盘，用于输入支付密码、验证码、车牌号等场景。

## 代码演示

### 数字键盘

展示 0-9 的数字按键和删除按键。

<<< @demo/keyboard/demo/Number.vue

### 带小数点的数字键盘

允许输入小数。

<<< @demo/keyboard/demo/Digit.vue

### 身份证键盘

由 0-9 和 X 组成。

<<< @demo/keyboard/demo/Idcard.vue

### 随机数字键盘

展示乱序的数字按键。

<<< @demo/keyboard/demo/Random.vue

### 车牌号键盘

用于输入车牌号。

<<< @demo/keyboard/demo/Plate.vue

## API

### KeyboardProps

| 属性         | 描述                | 类型                                                     | 默认值      |
| ------------ | ------------------- | -------------------------------------------------------- | ----------- |
| type         | 键盘类型            | `'number' \| 'digit' \| 'idcard' \| 'random' \| 'plate'` | `'number'`  |
| mode         | 'plate'键盘时的模式 | `'chinese' \| 'english'`                                 | `'chinese'` |
| disabled-key | 禁用按键的回调函数  | `(key: string) => boolean`                               | -           |

### KeyboardEmits

| 事件        | 描述                     | 类型                                     |
| ----------- | ------------------------ | ---------------------------------------- |
| input       | 可输入按键点击时触发     | `(key: string) => void`                  |
| delete      | 点击删除按钮时触发       | `() => void`                             |
| update:mode | 切换车牌号的中英文时触发 | `(mode: 'chinese' \| 'english') => void` |

### KeyBoardExpose

| 属性    | 描述                 | 类型         |
| ------- | -------------------- | ------------ |
| shuffle | 重新打乱随机键盘按键 | `() => void` |

## 主题定制

### 样式变量

| CSS 变量                                     | 值                            |
| -------------------------------------------- | ----------------------------- |
| `--s-keyboard-bg`                            | `var(--s-gray-200)`           |
| `--s-keyboard-padding`                       | `6px`                         |
| `--s-keyboard-key-gap`                       | `6px`                         |
| `--s-keyboard-key-color`                     | `var(--s-text-color-primary)` |
| `--s-keyboard-key-bg`                        | `var(--s-white)`              |
| `--s-keyboard-key-bg-active`                 | `var(--s-gray-300)`           |
| `--s-keyboard-key-height`                    | `var(--s-size-4xl)`           |
| `--s-keyboard-key-radius`                    | `var(--s-border-radius)`      |
| `--s-keyboard-key-font-size`                 | `var(--s-font-size-xl)`       |
| `--s-keyboard-key-plate-height`              | `var(--s-size-3xl)`           |
| `--s-keyboard-key-plate-radius`              | `var(--s-border-radius-sm)`   |
| `--s-keyboard-key-plate-font-size`           | `var(--s-font-size)`          |
| `--s-keyboard-key-plate-backspace-font-size` | `var(--s-size)`               |
| `--s-keyboard-key-plate-bg`                  | `var(--s-gray-300)`           |
| `--s-keyboard-key-plate-bg-active`           | `var(--s-gray-400)`           |
