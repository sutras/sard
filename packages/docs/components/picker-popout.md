---
title: PickerPopout
subtitle: 选择器弹出框
group: 表单组件
---

## 介绍

组合了选择器、弹出框组件，实现了便捷快速的选择功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/picker-popout/demo/Basic.vue

### 级联选择

<<< @demo/picker-popout/demo/Cascaded.vue

## API

### PickerPopoutProps\<T>

继承 [`PickerProps`](./picker#PickerProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### PickerPopoutSlots\<T>

继承 [`PickerSlots`](./picker#PickerSlots)

### PickerPopoutEmits\<T>

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                       | 类型                                                              |
| ----------------- | -------------------------- | ----------------------------------------------------------------- |
| update:visible    | 弹出框显隐时触发           | `(visible: boolean) => void`                                      |
| update:modelValue | 选择器输入组件值改变时触发 | `(value: any, selectedOptions: any[], indexes: number[]) => void` |
| change            | 选择器输入组件值改变时触发 | `(value: any, selectedOptions: any[], indexes: number[]) => void` |
| confirm           | 点击确定按钮时触发         | `(value: any, selectedOptions: any[], indexes: number[]) => void` |
