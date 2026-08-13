---
title: ShareSheet
subtitle: 分享面板
group: 反馈组件
---

## 介绍

从底部向上弹出分享菜单。

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置分享项。

<<< @demo/share-sheet/demo/Basic.vue

### 取消按钮

设置 `show-cancel` 属性展示取消按钮，或者使用 `cancel` 属性在设置取消按钮文本的同时显示取消按钮。

<<< @demo/share-sheet/demo/Cancel.vue

### 多行

`itemList` 属性值如果是二维数组则渲染成多行。

<<< @demo/share-sheet/demo/MultipleRow.vue

### 标题和描述

使用 `title` 和 `description` 配置标题和描述。

<<< @demo/share-sheet/demo/TitleDescription.vue

### 图片类型图标

`icon` 属性可以是图片路径。

<<< @demo/share-sheet/demo/Picture.vue

### 禁用

禁用的选项不可点击。

<<< @demo/share-sheet/demo/Disabled.vue

## API

### ShareSheetProps

继承 [`PopupProps`](./popup#PopupProps) 。

| 属性             | 描述                                                                 | 类型                  | 默认值  |
| ---------------- | -------------------------------------------------------------------- | --------------------- | ------- |
| title            | 面板标题                                                             | string                | -       |
| description      | 面板描述                                                             | string                | -       |
| cancel           | 取消按钮内容                                                         | string                | -       |
| show-cancel      | 是否显示取消按钮                                                     | boolean               | boolean |
| visible          | 面板是否可见                                                         | boolean               | -       |
| overlay-closable | 点击遮罩后是否关闭                                                   | boolean               | true    |
| before-close     | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | ShareSheetbeforeClose | -       |

#### ShareSheetbeforeClose

```ts
interface ShareSheetbeforeClose {
  (type: 'close' | 'cancel' | 'select'): boolean | Promise<any>
}
```

### ShareSheetSlots

| 插槽        | 描述               | 属性 |
| ----------- | ------------------ | ---- |
| default     | 自定义默认内容     | -    |
| description | 自定义描述         | -    |
| title       | 自定义标题         | -    |
| cancel      | 自定义取消按钮内容 | -    |

### ShareSheetEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述               | 类型                                  |
| -------------- | ------------------ | ------------------------------------- |
| update:visible | 分享面板显隐时触发 | `(visible: boolean) => void`          |
| close          | 点击遮罩时触发     | `() => void`                          |
| cancel         | 点击取消按钮时触发 | `() => void`                          |
| select         | 点击分享项时触发   | `(item: ShareSheetItemProps) => void` |

### ShareSheetRowSlots

| 插槽    | 描述   | 属性 |
| ------- | ------ | ---- |
| default | 行内容 | -    |

### ShareSheetItemProps

| 属性        | 描述     | 类型    | 默认值 |
| ----------- | -------- | ------- | ------ |
| label       | 标签     | string  | -      |
| value       | 值       | any     | -      |
| description | 描述     | string  | -      |
| disabled    | 禁用状态 | boolean | false  |

### ShareSheetItemSlots

| 插槽        | 描述       | 属性 |
| ----------- | ---------- | ---- |
| default     | 分享项内容 | -    |
| description | 分享项描述 | -    |
| icon        | 分享项图标 | -    |
| label       | 分享项标签 | -    |

### ShareSheetItemEmits

| 事件  | 描述             | 类型         |
| ----- | ---------------- | ------------ |
| click | 点击分享项时触发 | `() => void` |

### ShareSheetIconProps

| 属性       | 描述         | 类型   | 默认值 |
| ---------- | ------------ | ------ | ------ |
| color      | 图标颜色     | string | -      |
| background | 图标背景颜色 | string | -      |
| url        | 图片地址     | string | -      |

### ShareSheetIconSlots

| 插槽    | 描述       | 属性 |
| ------- | ---------- | ---- |
| default | 自定义图标 | -    |

## 主题定制

### 样式变量

| CSS 变量                                      | 值                               |
| --------------------------------------------- | -------------------------------- |
| `--s-share-sheet-border-radius`               | `var(--s-border-radius-xl)`      |
| `--s-share-sheet-border-color`                | `var(--s-border-color)`          |
| `--s-share-sheet-bg`                          | `var(--s-bg-color-elevated)`     |
| `--s-share-sheet-header-padding`              | `var(--s-size)`                  |
| `--s-share-sheet-title-font-size`             | `var(--s-font-size-lg)`          |
| `--s-share-sheet-description-font-size`       | `var(--s-font-size)`             |
| `--s-share-sheet-description-color`           | `var(--s-text-color-tertiary)`   |
| `--s-share-sheet-row-padding-y`               | `var(--s-size)`                  |
| `--s-share-sheet-row-padding-x`               | `var(--s-size-xs)`               |
| `--s-share-sheet-item-width`                  | `80px`                           |
| `--s-share-sheet-item-opacity-active`         | `var(--s-opacity-active)`        |
| `--s-share-sheet-icon-size`                   | `var(--s-size-4xl)`              |
| `--s-share-sheet-icon-radius`                 | `var(--s-border-radius-full)`    |
| `--s-share-sheet-icon-font-size`              | `var(--s-size-xl)`               |
| `--s-share-sheet-icon-color`                  | `var(--s-text-color-tertiary)`   |
| `--s-share-sheet-icon-bg`                     | `var(--s-fill-color)`            |
| `--s-share-sheet-label-margin-top`            | `var(--s-size-xs)`               |
| `--s-share-sheet-label-padding-x`             | `var(--s-size-2xs)`              |
| `--s-share-sheet-label-font-size`             | `var(--s-font-size)`             |
| `--s-share-sheet-label-color`                 | `var(--s-text-color-tertiary)`   |
| `--s-share-sheet-item-description-margin-top` | `0`                              |
| `--s-share-sheet-item-description-padding-x`  | `var(--s-size-2xs)`              |
| `--s-share-sheet-item-description-font-size`  | `var(--s-font-size-sm)`          |
| `--s-share-sheet-item-description-color`      | `var(--s-text-color-fourth)`     |
| `--s-share-sheet-gap-bg`                      | `var(--s-fill-color-tertiary)`   |
| `--s-share-sheet-gap-height`                  | `var(--s-size-xs)`               |
| `--s-share-sheet-cancel-min-height`           | `var(--s-content-height-lg)`     |
| `--s-share-sheet-cancel-padding`              | `var(--s-size-xs) var(--s-size)` |
| `--s-share-sheet-cancel-font-size`            | `var(--s-font-size-lg)`          |
| `--s-share-sheet-cancel-bg-active`            | `var(--s-bg-color-active)`       |
