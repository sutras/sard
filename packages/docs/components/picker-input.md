---
title: PickerInput
subtitle: 选择器输入框
group: 表单组件
---

## 介绍

组合了选择器弹出框、输入框组件，实现了便捷快速的选择功能。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹选择器的弹出框。

<<< @demo/picker-input/demo/Basic.vue

### 级联选择

<<< @demo/picker-input/demo/Cascaded.vue

## API

### PickerInputProps

继承 [`PickerPopoutProps`](./picker-popout#PickerPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

### PickerInputSlots

继承 [`PickerPopoutSlots`](./picker-popout#PickerPopoutSlots)和[`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### PickerInputEmits

继承 [`PickerPopoutEmits`](./picker-popout#PickerPopoutEmits) 。
