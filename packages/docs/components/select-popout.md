---
title: SelectPopout
subtitle: 列表选择弹出框
group: 表单组件
---

## 介绍

组合了列表选择、弹出框组件，实现了便捷快速的选择功能。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/select-popout/demo/Basic.vue

### 选项分组

你可以使用 `SelectOptionGroup` 组件对选项进行分组，`label` 属性为分组名。

<<< @demo/select-popout/demo/Group.vue

### 多选

设置 `multiple` 属性即可开启多选。

<<< @demo/select-popout/demo/Multiple.vue

### 显示工具栏

多选时，可是设置 `show-toolbar` 显示工具栏，工具栏提供“选择所有”和“清空选择”功能按钮，并显示当前所有的个数。

<<< @demo/select-popout/demo/Toolbar.vue

### 最多选择个数

多选时，可以设置 `multiple-limit` 属性限制最多选择个数。

<<< @demo/select-popout/demo/MultipleLimit.vue

### 禁用选项

设置选项的 `disabled` 属性，可以禁止选择此选项。

<<< @demo/select-popout/demo/Disabled.vue

### 自定义选项标签

默认选项标签只能设置文字，如果要自定义结构，可以使用选项的 `label` 插槽。

<<< @demo/select-popout/demo/CustomLabel.vue

### 自定义整个选项

如果要自定义整个选项结构，可以使用默认插槽，并设置选项的 `plain` 属性来清除默认样式。

<<< @demo/select-popout/demo/CustomOption.vue

### 筛选选项

如果选项数量太多，可以设置 `filterable` 属性显示筛选输入框；并设置 `filter-method` 属性，这个属性是一个回调函数，会在输入框值改变时触发，并接收输入框值作为参数。筛选逻辑需自行实现。

<<< @demo/select-popout/demo/Filterable.vue

### 远程

使用 `v-model:filter-value` 绑定筛选值，从远程获取数据，可以在 `bottom` 插槽或默认插槽（自渲染 option）中放置 `LoadMore` 组件来加载分页数据。

<<< @demo/select-popout/demo/Remote.vue

## API

### SelectPopoutProps

继承 [`SelectProps`](./select#SelectProps) 和 [`FormPopoutProps`](./popout#FormPopoutProps)。

### SelectPopoutSlots

继承 [`SelectSlots`](./select#SelectSlots)

### SelectPopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits) 和 [SelectEmits](./select#selectemits)。

| 事件           | 描述               | 类型                         |
| -------------- | ------------------ | ---------------------------- |
| update:visible | 弹出框显隐时触发   | `(visible: boolean) => void` |
| confirm        | 点击确定按钮时触发 | `(value: any) => void`       |
