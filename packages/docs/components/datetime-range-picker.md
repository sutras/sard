---
title: DatetimeRangePicker
subtitle: 日期时间范围选择器
group: 表单组件
---

## 介绍

用于选择日期时间范围。

## 代码演示

### 基础使用

和 `DatetimePicker` 组件用法类似，多了一个 `tabs` 属性设置起始和结束标签页标题。

<<< @demo/datetime-range-picker/demo/Basic.vue

## API

### DatetimeRangePickerProps

继承 [`DatetimePickerProps`](./datetime-picker#DatetimePickerProps) 。

| 属性        | 描述                     | 类型                 | 默认值 |
| ----------- | ------------------------ | -------------------- | ------ |
| model-value | 绑定的值                 | `(Date \| string)[]` | -      |
| tabs        | 设置起始和结束标签页标题 | string[]             | -      |

### DatetimeRangePickerEmits

| 事件              | 描述                 | 类型                                 |
| ----------------- | -------------------- | ------------------------------------ |
| update:modelValue | 选中的选项改变时触发 | `(date: (Date \| string)[]) => void` |
| change            | 选中的选项改变时触发 | `(date: (Date \| string)[]) => void` |

### DatetimeRangePickerSlots

| 插槽   | 描述           | 属性         |
| ------ | -------------- | ------------ |
| header | 自定义头部内容 | `() => void` |
| footer | 自定义底部内容 | `() => void` |
