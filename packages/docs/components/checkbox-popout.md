---
title: CheckboxPopout
subtitle: 复选弹出框
group: 表单组件
---

## 介绍

组合了复选框组、列表、弹出框组件，实现了在弹出框中多选的功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/checkbox-popout/demo/Basic.vue

### 全选

使用 `show-check-all` 显示全选框，可用于快速选择所有或取消选择。

<<< @demo/checkbox-popout/demo/CheckAll.vue

### 禁用选项

设置了 `disabled` 的选项可禁止选择。

<<< @demo/checkbox-popout/demo/Disabled.vue

### 可搜索的

使用 `searchable` 显示搜索框，可用于过滤选项列表。

<<< @demo/checkbox-popout/demo/Search.vue

## API

### CheckboxPopoutProps

继承 [`CheckboxGroupProps`](./checkbox#CheckboxGroupProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

| 属性               | 描述                 | 类型              | 默认值 |
| ------------------ | -------------------- | ----------------- | ------ |
| show-check-all     | 是否显示全选         | boolean           | false  |
| searchable         | 是否可搜索           | boolean           | false  |
| filter-placeholder | 搜索输入框占位符内容 | string            | -      |
| icon-position      | 可定义复选框的位置   | 'left' \| 'right' | 'left' |

### CheckboxPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件              | 描述                     | 类型                                  |
| ----------------- | ------------------------ | ------------------------------------- |
| update:modelValue | 复选输入组件值改变时触发 | `(value: any[] \| undefined) => void` |
| change            | 复选输入组件值改变时触发 | `(value: any[] \| undefined) => void` |
| update:visible    | 弹出框显隐时触发         | `(visible: boolean) => void`          |
| confirm           | 点击确定按钮时触发       | `() => void`                          |

## 主题定制

### 样式变量

| CSS 变量                                  | 值                               |
| ----------------------------------------- | -------------------------------- |
| `--s-checkbox-popout-max-height`          | `320px`                          |
| `--s-checkbox-popout-toolbar-gap`         | `var(--s-size-xs)`               |
| `--s-checkbox-popout-toolbar-padding`     | `var(--s-size-xs) var(--s-size)` |
| `--s-checkbox-popout-check-all-font-size` | `var(--s-font-size-sm)`          |
| `--s-checkbox-popout-check-all-color`     | `var(--s-text-color-tertiary)`   |
