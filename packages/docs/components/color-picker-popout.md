---
title: ColorPickerPopout
subtitle: 颜色选择器弹出框
group: 表单组件
---

## 介绍

组合了颜色选择器、弹出框组件，实现了便捷快速的颜色选择功能。

## 代码演示

### 基础使用

<<< @demo/color-picker-popout/demo/Basic.vue

## API

### ColorPickerPopoutProps

继承 [`ColorPickerProps`](./color-picker#ColorPickerProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### ColorPickerPopoutEmits

| 事件              | 描述                 | 类型                         |
| ----------------- | -------------------- | ---------------------------- |
| update:visible    | 弹出层显隐变化时触发 | `(visible: boolean) => void` |
| update:modelValue | 确认选择后触发       | `(value: string) => void`    |
| change            | 确认选择后触发       | `(value: string) => void`    |
| confirm           | 点击确认按钮时触发   | `() => void`                 |
