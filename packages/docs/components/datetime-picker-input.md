---
title: DatetimePickerInput
subtitle: 日期时间输入框
group: 表单组件
---

## 介绍

组合了日期时间弹出框、输入框组件，实现了便捷快速的日期选择功能。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示日期时间弹出框。

<<< @demo/datetime-picker-input/demo/Basic.vue

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

<<< @demo/datetime-picker-input/demo/OutletFormat.vue

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

<<< @demo/datetime-picker-input/demo/ValueFormat.vue

### min、max 联动

可以通过 `min` 和 `max` 属性使两个选择器联动。

选择日期时间范围，使用 `DatetimeRangePickerInput` 是更好的选择。

<<< @demo/datetime-picker-input/demo/Range.vue

## API

### DatetimePickerInputProps

继承 [`DatetimePickerPopoutProps`](./datetime-picker-popout#DatetimePickerPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

| 属性          | 描述                                                         | 类型                                                      | 默认值 |
| ------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ------ |
| outlet-format | 输出到输入框的日期格式，不指定则根据 `type` 属性自动生成格式 | string [详见特殊符号](../utilities/date#日期格式特殊符号) | -      |

### `type` 到 `outletFormat` 的映射：

```ts
const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdh: 'YYYY-MM-DD HH',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
```

### DatetimePickerInputSlots

继承 [`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### DatetimePickerInputEmits

继承 [`DatetimePickerPopoutEmits`](./datetime-picker-popout#DatetimePickerPopoutEmits)
