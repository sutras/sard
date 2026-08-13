---
title: ColorPickerInput
subtitle: 颜色选择器输入框
group: 表单组件
---

## 介绍

组合了颜色选择器、弹出框、输入框组件，实现了便捷快速的颜色选择功能。

## 代码演示

### 基础使用

<<< @demo/color-picker-input/demo/Basic.vue

## API

### ColorPickerInputProps

继承 [`ColorPickerPopoutProps`](./color-picker-popout#ColorPickerPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

### ColorPickerInputEmits

| 事件              | 描述                 | 类型                         |
| ----------------- | -------------------- | ---------------------------- |
| update:modelValue | 颜色值变化时触发     | `(value: string) => void`    |
| change            | 颜色值变化时触发     | `(value: string) => void`    |
| update:visible    | 弹出层显隐变化时触发 | `(visible: boolean) => void` |
| confirm           | 点击确认按钮时触发   | `() => void`                 |
