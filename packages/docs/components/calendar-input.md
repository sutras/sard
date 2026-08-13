---
title: CalendarInput
subtitle: 日历输入框
group: 表单组件
---

## 介绍

组合了日历、弹出框、输入框组件，实现了便捷快速的日历选择功能。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示日历弹出框。

<<< @demo/calendar-input/demo/Basic.vue

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

<<< @demo/calendar-input/demo/OutletFormat.vue

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

<<< @demo/calendar-input/demo/ValueFormat.vue

### 类型

下面展示了不同类型选择的值在输入框的展示。

<<< @demo/calendar-input/demo/Type.vue

## API

### CalendarInputProps

继承 [`CalendarPopoutProps`](./calendar-popout#CalendarPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps)。

| 属性          | 描述                   | 类型                                                      | 默认值         |
| ------------- | ---------------------- | --------------------------------------------------------- | -------------- |
| outlet-format | 输出到输入框的日期格式 | string [详见特殊符号](../utilities/date#日期格式特殊符号) | `'YYYY-MM-DD'` |

### CalendarInputSlots

继承 [`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### CalendarInputEmits

继承 [`CalendarPopoutEmits`](./calendar-popout#CalendarPopoutEmits)
