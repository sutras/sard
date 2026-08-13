---
title: CheckboxInput
subtitle: 复选输入框
group: 表单组件
---

## 介绍

组合了复选弹出框、列表、输入框组件，实现了在弹出框中多选的功能。

## 代码演示

### 基础使用

通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本，
通过 `options` 属性设置可选项。

<<< @demo/checkbox-input/demo/Basic.vue

## API

### CheckboxInputProps

继承 [`CheckboxPopoutProps`](./checkbox-popout#CheckboxPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps)。

### CheckboxInputSlots

继承 [`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### CheckboxInputEmits

继承 [`CheckboxPopoutEmits`](./checkbox-popout#CheckboxPopoutEmits)
