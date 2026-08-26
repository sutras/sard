---
title: DatetimeRangePickerPopout
subtitle: 日期时间范围弹出框
group: 表单组件
---

## 介绍

组合了日期时间范围、弹出框组件，实现了便捷快速的日期时间范围选择功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/datetime-range-picker-popout/demo/Basic.vue

## API

### DatetimeRangePickerPopoutProps

继承 [`DatetimeRangePickerProps`](./datetime-range-picker#DatetimeRangePickerProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### DatetimeRangePickerPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                         | 类型                                              |
| ----------------- | ---------------------------- | ------------------------------------------------- |
| update:visible    | 弹出框显隐时触发             | `(visible: boolean) => void`                      |
| update:modelValue | 日期时间输入组件值改变时触发 | `(date: (Date \| string)[] \| undefined) => void` |
| change            | 日期时间输入组件值改变时触发 | `(date: (Date \| string)[] \| undefined) => void` |
| confirm           | 点击确定按钮时触发           | `(date: (Date \| string)[] \| undefined) => void` |

### DatetimeRangePickerPopoutSlots

继承 [`DatetimeRangePickerSlots`](./datetime-range-picker#DatetimeRangePickerSlots)
