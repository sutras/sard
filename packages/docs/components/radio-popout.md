---
title: RadioPopout
subtitle: 单选弹出框
group: 表单组件
---

## 介绍

组合了单选框组、列表、弹出框组件，实现了在弹出框中单选的功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/radio-popout/demo/Basic.vue

### 禁用选项

设置了 `disabled` 的选项可禁止选择。

<<< @demo/radio-popout/demo/Disabled.vue

### 可搜索的

使用 `searchable` 显示搜索框，可用于过滤选项列表。

<<< @demo/radio-popout/demo/Search.vue

## API

### RadioPopoutProps

继承 [`RadioGroupProps`](./radio#RadioGroupProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

| 属性               | 描述                 | 类型              | 默认值 |
| ------------------ | -------------------- | ----------------- | ------ |
| searchable         | 是否可搜索           | boolean           | false  |
| filter-placeholder | 搜索输入框占位符内容 | string            | -      |
| icon-position      | 可定义单选按钮的位置 | 'left' \| 'right' | 'left' |

### RadioPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                     | 类型                                |
| ----------------- | ------------------------ | ----------------------------------- |
| update:modelValue | 单选输入组件值改变时触发 | `(value: any \| undefined) => void` |
| change            | 单选输入组件值改变时触发 | `(value: any \| undefined) => void` |
| update:visible    | 弹出框显隐时触发         | `(visible: boolean) => void`        |
| confirm           | 点击确定按钮时触发       | `() => void`                        |

## 主题定制

### 样式变量

| CSS 变量                           | 值                               |
| ---------------------------------- | -------------------------------- |
| `--s-radio-popout-max-height`      | `320px`                          |
| `--s-radio-popout-toolbar-gap`     | `var(--s-size-xs)`               |
| `--s-radio-popout-toolbar-padding` | `var(--s-size-xs) var(--s-size)` |
