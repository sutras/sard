---
title: SelectInput
subtitle: 列表选择输入框
group: 表单组件
---

## 介绍

组合了列表选择弹出框、输入框组件，实现了便捷快速的选择功能。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示列表选择弹出框。

相比较于 `Select` 和 `SelectPopout` 组件，`SelectInput` 组件需要传递 `options` 属性，因为需要通过此属性获取当前值对应的标签，以便显示在输入框内。

<<< @demo/select-input/demo/Basic.vue

### 自定义整个选项

`SelectInput` 组件依然可以像 `Select` 和 `SelectPopout` 组件一样使用插槽自定义内容。

但 `options` 属性还是必传的。

<<< @demo/select-input/demo/CustomOption.vue

### 多选

默认选择的选项的标签最多 10 会显示在输入框，其余通过 `+<rest>` 的形式展示。可以通过 `max-labels` 属性设置最多展示的标签数。

<<< @demo/select-input/demo/Multiple.vue

### 远程

使用 `v-model:filter-value` 绑定筛选值，从远程获取数据，可以在 `bottom` 插槽或默认插槽（自渲染 option）中放置 `LoadMore` 组件来加载分页数据。

<<< @demo/select-input/demo/Remote.vue

## API

### SelectInputProps

继承 [`SelectPopoutProps`](./select-popout#SelectPopoutProps) 和 [`PopoutInputProps`](./popout-input#PopoutInputProps) 。

| 属性       | 描述                                                                                     | 类型             | 默认值 |
| ---------- | ---------------------------------------------------------------------------------------- | ---------------- | ------ |
| max-labels | 多选时，输入框最大展示标签个数，设为 -1 表示不限制                                       | number           | 10     |
| map-label  | 选项标签映射表，远程加载时如果选项标签不在列表中，可以通过此属性配置一个映射表来显示标签 | Record<any, any> | -      |

### SelectInputSlots

继承 [`SelectPopoutSlots`](./select-popout#SelectPopoutSlots)和[`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### SelectInputEmits

继承 [`SelectPopoutEmits`](./select-popout#SelectPopoutEmits)
