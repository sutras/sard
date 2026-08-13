---
title: CascaderInput
subtitle: 级联输入框
group: 表单组件
---

## 介绍

组合了级联弹出框、输入框组件，实现了便捷快速的级联选择功能。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示级联弹出框。

<<< @demo/cascader-input/demo/Basic.vue

### 多选

设置 `multiple` 可进行多选，设置 `max-rows` 可限制输入框展示的行数。

<<< @demo/cascader-input/demo/Multiple.vue

### 懒加载

没有加载到数据时，输入框会暂时展示值，而不是标签文本，当加载完数据时，才替换为标签文本。

<<< @demo/cascader-input/demo/Lazy.vue

## API

### CascaderInputProps

继承 [`CascaderPopoutProps`](./cascader-popout#CascaderPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

| 属性     | 描述                                           | 类型   | 默认值 |
| -------- | ---------------------------------------------- | ------ | ------ |
| max-rows | 多选时，输入框最大展示行数，设为 -1 表示不限制 | number | 3      |

### CascaderInputSlots

继承 [`CascaderPopoutSlots`](./cascader-popout#CascaderPopoutSlots)和[`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### CascaderInputEmits

继承 [`CascaderPopoutEmits`](./cascader-popout#CascaderPopoutEmits)
