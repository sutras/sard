---
title: Accordion
subtitle: 手风琴
group:
  title: 数据展示
  order: 3
---

## 介绍

通过折叠收纳内容，允许同时展开一个或多个。

## 代码演示

### 基础使用

为手风琴每一个面板添加一个 `name` 属性，使用 `v-model` 绑定展开的面板。

<<< @demo/accordion/demo/Basic.vue

### 展开多个

设置 `multiple` 属性可以同时展开多个面板，此时 `v-model` 要绑定一个数组。

<<< @demo/accordion/demo/Multiple.vue

### 禁用

使用 `disabled` 属性可以禁用指定单个面板。

<<< @demo/accordion/demo/Disabled.vue

### 隐藏边框

可以使用 `hide-border` 属性隐藏边框。

<<< @demo/accordion/demo/HideBorder.vue

### 插槽

可以使用 `title`, `extra`, `arrow` 插槽来自定义内容。

<<< @demo/accordion/demo/Slot.vue

## API

### AccordionProps

| 属性        | 描述                   | 类型                                     | 默认值 |
| ----------- | ---------------------- | ---------------------------------------- | ------ |
| model-value | 当前展开面板的 `name`  | string \| number \| (string \| number)[] | -      |
| multiple    | 是否可同时展开多个面板 | boolean                                  | false  |
| hide-border | 是否隐藏边框           | boolean                                  | false  |

### AccordionSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### AccordionEmits

| 事件              | 描述           | 类型                                                        |
| ----------------- | -------------- | ----------------------------------------------------------- |
| update:modelValue | 切换面板时触发 | `(value: string \| number \| (string \| number)[]) => void` |

### AccordionItemProps

| 属性     | 描述           | 类型             | 默认值 |
| -------- | -------------- | ---------------- | ------ |
| title    | 面板标题       | string           | -      |
| extra    | 面板右边的内容 | string           | -      |
| name     | 面板的唯一标识 | string \| number | -      |
| disabled | 禁用面板       | boolean          | false  |

### AccordionItemSlots

| 插槽    | 描述             | 属性                   |
| ------- | ---------------- | ---------------------- |
| default | 自定义默认内容   | -                      |
| title   | 自定义标题内容   | -                      |
| extra   | 自定义值内容内容 | -                      |
| arrow   | 自定义箭头       | `{ visible: boolean }` |

### AccordionItemEmits

| 事件  | 描述               | 类型                          |
| ----- | ------------------ | ----------------------------- |
| click | 点击面板头部时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                              | 值                            |
| ------------------------------------- | ----------------------------- |
| `--s-accordion-bg`                    | `var(--s-bg-color-container)` |
| `--s-accordion-bg-active`             | `var(--s-bg-color-active)`    |
| `--s-accordion-border-color`          | `var(--s-border-color)`       |
| `--s-accordion-item-header-padding-x` | `var(--s-size)`               |
| `--s-accordion-item-header-padding-y` | `var(--s-size-sm)`            |
| `--s-accordion-item-title-font-size`  | `var(--s-font-size)`          |
| `--s-accordion-item-body-padding-x`   | `var(--s-size)`               |
| `--s-accordion-item-body-padding-y`   | `var(--s-size)`               |
