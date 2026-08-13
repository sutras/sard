---
title: Popover
subtitle: 气泡弹出框
group: 数据展示
---

## 介绍

弹出式的气泡菜单。

## 代码演示

### 基础使用

弹窗会显示默认插槽内容。

点击 `reference` 插槽内容时会显示弹出框，点击弹出框外部时会隐藏弹出框。

<<< @demo/popover/demo/Basic.vue

### 受控

可使用 `v-model:visible` 控制弹出框显隐，可通过 `outside-closable` 取消外部点击关闭。

<<< @demo/popover/demo/Controll.vue

### 菜单内容

可结合 `Menu` 组件实现弹出式菜单选择。

<<< @demo/popover/demo/Menu.vue

### 暗黑模式

使用 `theme` 属性可设置暗黑模式。

<<< @demo/popover/demo/Dark.vue

### 弹出位置

气泡弹出框会尽量在视窗中匹配各个位置以便可以完整展示，同时不会完全脱离 reference 元素，默认底部居中展示。

<<< @demo/popover/demo/Position.vue

### 自定义 reference

如果因 `DOM` 结构限制，无法在 `Popover` 组件的 `reference` 插槽放置元素时，
可以通过 `reference` 属性接收 DOM 元素。

<<< @demo/popover/demo/CustomReference.vue

### 手动定义位置

`reference` 属性除了接收 DOM 元素，还可以接受 `{ getBoundingClientRect: () => DOMRect }` 类型对象，通过构建 `DOMRect` 对象，可以将弹出框放置到任意位置。

<<< @demo/popover/demo/Manual.vue

## API

### PopoverProps

| 属性             | 描述                                                         | 类型                            | 默认值   |
| ---------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| visible          | 是否显示气泡弹出框                                           | boolean                         | -        |
| position         | 弹出位置                                                     | PopoverPosition                 | 'bottom' |
| theme            | 主题风格                                                     | 'dark' \| 'light'               | 'light'  |
| refGap           | 气泡弹出框与`reference`元素的间距，单位 px                   | number                          | 10       |
| viewport-gap     | 气泡弹出框距与视窗的间距，单位 px                            | number                          | 10       |
| reference        | 触发弹出框的 HTML 元素，或者类似 PopperTarget 的结构类型对象 | PopperTarget \| Element \| null | -        |
| outside-closable | 点击弹出框外部时是否关闭弹出框                               | boolean                         | true     |

### PopperTarget

```ts
export interface PopperTarget {
  getBoundingClientRect: () => DOMRect
}
```

### PopoverSlots

| 插槽      | 描述                                     | 属性 |
| --------- | ---------------------------------------- | ---- |
| default   | 自定义弹出框内容                         | -    |
| reference | 触发弹出框的 HTML 元素，只接受单个根元素 | -    |

### PopoverEmits

| 事件           | 描述             | 类型                         |
| -------------- | ---------------- | ---------------------------- |
| update:visible | 弹出框显隐时触发 | `(visible: boolean) => void` |

### PopoverPosition

```tsx
type PopoverPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
```

## 主题定制

### 样式变量

| CSS 变量                    | 值                              |
| --------------------------- | ------------------------------- |
| `--s-popover-bg`            | `var(--s-bg-color-elevated)`    |
| `--s-popover-box-shadow`    | `var(--s-box-shadow-secondary)` |
| `--s-popover-min-width`     | `80px`                          |
| `--s-popover-border-radius` | `var(--s-border-radius)`        |
| `--s-popover-bg-dark`       | `var(--s-gray-800)`             |
| `--s-popover-color-dark`    | `var(--s-white)`                |
| `--s-popover-arrow-size`    | `10px`                          |
