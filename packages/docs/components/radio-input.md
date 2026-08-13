---
title: RadioInput
subtitle: 单选输入框
group: 表单组件
---

## 介绍

组合了单选弹出框、列表、输入框组件，实现了在弹出框中单选的功能。

## 代码演示

### 基础使用

通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本，
通过 `options` 属性设置可选项。

<<< @demo/radio-input/demo/Basic.vue

## API

### RadioInputProps

继承 [`RadioPopoutProps`](./radio-popout#RadioPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

### RadioInputSlots

继承 [`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### RadioInputEmits

继承 [`RadioPopoutEmits`](./radio-popout#RadioPopoutEmits)
