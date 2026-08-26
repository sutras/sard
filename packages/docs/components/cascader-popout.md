---
title: CascaderPopout
subtitle: 级联弹出框
group: 表单组件
---

## 介绍

组合了级联选择、弹出框组件，实现了便捷快速的级联选择功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/cascader-popout/demo/Basic.vue

### 多选

设置 `multiple` 可进行多选。

<<< @demo/cascader-popout/demo/Multiple.vue

## API

### CascaderPopoutProps

继承 [`CascaderProps`](./cascader#CascaderProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### CascaderPopoutSlots

继承 [`CascaderSlots`](./cascader#CascaderSlots)。

### CascaderPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                     | 类型                                                                   |
| ----------------- | ------------------------ | ---------------------------------------------------------------------- |
| update:visible    | 弹出框显隐时触发         | `(visible: boolean) => void`                                           |
| select            | 选择级联选择某一项时触发 | `(option: CascaderOption, tabIndex: number) => void`                   |
| update:modelValue | 级联输入组件值改变时触发 | `(value: string \| number, selectedOptions: CascaderOption[]) => void` |
| change            | 级联输入组件值改变时触发 | `(value: string \| number, selectedOptions: CascaderOption[]) => void` |
| confirm           | 点击确定按钮时触发       | `(value: string \| number, selectedOptions: CascaderOption[]) => void` |
