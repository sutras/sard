---
title: DatetimePickerPopout
subtitle: 日期时间弹出框
group: 表单组件
---

## 介绍

组合了日期时间、弹出框组件，实现了便捷快速的日期选择功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/datetime-picker-popout/demo/Basic.vue

### 类型

可以使用 `yMdhms`（年月日时分秒）进行任意组合，每个字母对应一列。

<<< @demo/datetime-picker-popout/demo/Type.vue

### 自定义日期时间范围

可以使用 `min` 和 `max` 属性限制可以选择的日期时间的范围。

<<< @demo/datetime-picker-popout/demo/MinMax.vue

### 过滤器

可以使用 `filter` 属性来仅展示想要的内容，只有返回真的值才会展示。

<<< @demo/datetime-picker-popout/demo/Filter.vue

### 格式化

可以使用 `formatter` 属性格式化展示的内容。

<<< @demo/datetime-picker-popout/demo/Formatter.vue

### 农历

可以设置 `calendar="lunar"` 将历法类型改为农历。农历仅用于展示，实际绑定的值还是公历。

<<< @demo/datetime-picker-popout/demo/Calendar.vue

## API

### DatetimePickerPopoutProps

继承 [`DatetimePickerProps`](./datetime-picker#DatetimePickerProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### DatetimePickerPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                         | 类型                                           |
| ----------------- | ---------------------------- | ---------------------------------------------- |
| update:visible    | 弹出框显隐时触发             | `(visible: boolean) => void`                   |
| update:modelValue | 日期时间输入组件值改变时触发 | `(value: Date \| string \| undefined) => void` |
| change            | 日期时间输入组件值改变时触发 | `(value: Date \| string \| undefined) => void` |
| confirm           | 点击确定按钮时触发           | `(value: Date \| string \| undefined) => void` |
