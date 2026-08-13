---
title: PopoutInput
subtitle: 弹出式输入框
group: 表单组件
---

## 介绍

输入框组件，用于配合弹出框组件和表单控件一起使用。自定义了输入框样式。

## 代码演示

### 基础使用

使用 `v-model` 绑定值， `click` 事件监听点击事件。

<<< @demo/popout-input/demo/Basic.vue

## API

### PopoutInputProps

| 属性           | 描述                   | 类型                             | 默认值            |
| -------------- | ---------------------- | -------------------------------- | ----------------- |
| model-value    | 输入框值               | string                           | -                 |
| placeholder    | 输入框占位符内容       | string                           | -                 |
| disabled       | 禁用状态               | boolean                          | false             |
| readonly       | 只读状态               | boolean                          | false             |
| loading        | 加载状态               | boolean                          | false             |
| clearable      | 是否显示清空按钮       | boolean                          | false             |
| multiline      | 是否多行输入框         | boolean                          | false             |
| input-props    | 自定义输入框组件属性   | [InputProps](./input#InputProps) | -                 |
| value-on-clear | 设置点击清除按钮后的值 | `() => any`                      | `() => undefined` |

### PopoutInputSlots

| 插槽    | 描述                 | 属性         |
| ------- | -------------------- | ------------ |
| arrow   | 自定义箭头           | `() => void` |
| prepend | 自定义输入框前置内容 | `() => void` |
| append  | 自定义输入框后置内容 | `() => void` |
| default | 自定义默认插槽       | `() => void` |

### PopoutInputEmits

| 事件              | 描述                               | 类型                          |
| ----------------- | ---------------------------------- | ----------------------------- |
| click             | 点击输入框时触发，只读和禁用不触发 | `(event: MouseEvent) => void` |
| update:modelValue | 输入框值改变时触发                 | `(value: string) => void`     |
| change            | 输入框值改变时触发                 | `(value: string) => void`     |
| clear             | 点击清除按钮时触发                 | `() => void`                  |

## 主题定制

### 样式变量

| CSS 变量                           | 值                           |
| ---------------------------------- | ---------------------------- |
| `--s-popout-input-arrow-font-size` | `var(--s-font-size)`         |
| `--s-popout-input-arrow-color`     | `var(--s-border-color)`      |
| `--s-popout-input-opacity-active`  | `var(--s-opacity-active)`    |
| `--s-popout-input-append-gap`      | `var(--s-size-2xs)`          |
| `--s-popout-input-loading-size`    | `var(--s-font-size-lg)`      |
| `--s-popout-input-loading-color`   | `var(--s-text-color-fourth)` |
