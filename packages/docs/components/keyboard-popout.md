---
title: KeyboardPopout
subtitle: 键盘弹出框
group: 表单组件
---

## 介绍

组合了键盘、弹出框组件，在弹出框中显示键盘。

## 代码演示

### 基础使用

使用 `v-model:visible` 控制弹出框显隐，通过 `input` 和 `delete` 事件处理输入内容。

<<< @demo/keyboard-popout/demo/Basic.vue

### 插槽

使用默认插槽可以在键盘上方添加自定义内容。

<<< @demo/keyboard-popout/demo/Slot.vue

### 类型

可以切换不同的键盘类型，在弹出框中展示数字、小数、身份证和随机数字键盘。

<<< @demo/keyboard-popout/demo/Type.vue

### 车牌号键盘

下面演示如何使用 `mode` 和 `disabled-key` 属性引导和规范化车牌号输入。

<<< @demo/keyboard-popout/demo/Plate.vue

## API

### KeyboardPopoutProps

继承 [`KeyboardProps`](./keyboard#KeyboardProps) 。

| 属性         | 描述                                     | 类型    | 默认值 |
| ------------ | ---------------------------------------- | ------- | ------ |
| visible      | 是否显示弹出框                           | boolean | -      |
| title        | 弹出框标题                               | string  | -      |
| transparent  | 遮罩是否透明                             | boolean | false  |
| show-cancel  | 是否显示取消按钮                         | boolean | true   |
| show-confirm | 是否显示确定按钮                         | boolean | true   |
| show-shadow  | 是否显示阴影，在无遮罩时将弹窗与页面分隔 | boolean | false  |

### KeyboardPopoutSlots

| 插槽    | 描述       | 属性 |
| ------- | ---------- | ---- |
| default | 自定义内容 | -    |

### KeyboardPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述                     | 类型                                     |
| -------------- | ------------------------ | ---------------------------------------- |
| update:visible | 弹出框显隐时触发         | `(visible: boolean) => void`             |
| close          | 点击关闭按钮或遮罩时触发 | `() => void`                             |
| cancel         | 点击取消按钮时触发       | `() => void`                             |
| confirm        | 点击确定按钮时触发       | `() => void`                             |
| input          | 可输入按键点击时触发     | `(key: string) => void`                  |
| delete         | 点击删除按钮时触发       | `() => void`                             |
| toggle         | 切换车牌号中英文时触发   | `(mode: 'chinese' \| 'english') => void` |
| update:mode    | 切换车牌号中英文时触发   | `(mode: 'chinese' \| 'english') => void` |

### KeyboardPopoutExpose

| 属性    | 描述                 | 类型                                      |
| ------- | -------------------- | ----------------------------------------- |
| shuffle | 重新打乱随机数字键盘 | `() => void`                              |
| toggle  | 切换车牌号中英文键盘 | `(mode?: 'chinese' \| 'english') => void` |
