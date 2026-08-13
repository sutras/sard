---
title: Dialog
subtitle: 对话框
group: 反馈组件
---

## 介绍

提示或接收用户的确认。

## 代码演示

### 基础使用

使用 `dialog` 等方法显示对话框。

<<< @demo/dialog/demo/Basic.vue

### 异步关闭

如果 `beforeClose` 返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭。

<<< @demo/dialog/demo/AsyncClose.vue

### 圆角按钮

`buttonType` 属性值为 `round` 可以将底部按钮显示为圆角的形式。

<<< @demo/dialog/demo/Round.vue

### 有头部的

配置 `headed` 属性让对话框显示头部，此时的对话框更像一个模态框。

<<< @demo/dialog/demo/Headed.vue

### 自定义内容

对话框里面可以放置任何内容，例如以模态的方式展示一个表单，通常要配合 `headed` 属性一起使用。

<<< @demo/dialog/demo/Content.vue

### 内容中包含弹出框

对话框底层的 `Popup` 组件包裹在 `teleport` 中，因此基于 `Popup` 的可弹出组件都可以相互嵌套使用，也可以放置在滚动元素里面。

<<< @demo/dialog/demo/PopupContent.vue

### 自定义按钮属性

使用 `cancelProps` 和 `confirmProps` 属性可以自定义取消和确定按钮组件的属性。

<<< @demo/dialog/demo/ButtonProps.vue

## API

### DialogProps

| 属性             | 描述                                                           | 类型              | 默认值  |
| ---------------- | -------------------------------------------------------------- | ----------------- | ------- |
| visible          | 是否可见                                                       | boolean           | false   |
| title            | 标题                                                           | string            | -       |
| message          | 文本内容                                                       | string            | -       |
| headed           | 是否显示带头部类型                                             | boolean           | true    |
| button-type      | 按钮类型                                                       | 'round' \| 'text' | 'round' |
| show-cancel      | 是否显示取消按钮                                               | boolean           | true    |
| cancel-text      | 取消按钮文案                                                   | string            | '取消'  |
| show-confirm     | 是否显示确定按钮                                               | boolean           | true    |
| confirm-text     | 确定按钮文案                                                   | string            | '确定'  |
| overlay-closable | 点击遮罩是否关闭                                               | boolean           | true    |
| before-close     | 关闭前的回调，返回 `false` 或 `Promise{<rejected>}` 可阻止关闭 | DialogBeforeClose | -       |
| confirm-props    | 设置确定按钮 props                                             | ButtonProps       | -       |
| cancel-props     | 设置取消按钮 props                                             | ButtonProps       | -       |

#### DialogBeforeClose

- 当点击确定按钮时，`type` 为 `confirm`；
- 当点击取消按钮时，`type` 为 `cancel`；
- 当点击关闭按钮或遮罩时，`type` 为 `close`。

`loading` 表示当前哪个按钮处于异步关闭状态。

```ts
type DialogBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any
```

### DialogSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DialogEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述                     | 类型                         |
| -------------- | ------------------------ | ---------------------------- |
| update:visible | 对话框显隐时触发         | `(visible: boolean) => void` |
| close          | 点击关闭按钮或遮罩时触发 | `() => void`                 |
| cancel         | 点击取消按钮时触发       | `() => void`                 |
| confirm        | 点击确定按钮时触发       | `() => void`                 |

### 命令式方法

| 名称           | 描述             | 类型                     |
| -------------- | ---------------- | ------------------------ |
| dialog         | 显示对话框       | DialogFunction           |
| dialog.alert   | 显示警告框       | DialogSimpleShowFunction |
| dialog.confirm | 显示确认框       | DialogSimpleShowFunction |
| dialog.hide    | 隐藏命令式对话框 | `() => void`             |

### DialogFunction

```ts
type DialogFunction = DialogSimpleShowFunction & {
  alert: DialogSimpleShowFunction
  confirm: DialogSimpleShowFunction
  hide: () => void
}
```

### DialogSimpleShowFunction

```ts
interface DialogSimpleShowFunction {
  (options: DialogOptions): void
  (title: string, options?: DialogOptions): void
}
```

### defaultDialogOptions

命令式默认值和声明式有所区别。

```ts
const defaultDialogOptions = {
  headed: false,
  buttonType: 'text',
  showCancel: false,
}
```

## 主题定制

### 样式变量

| CSS 变量                            | 值                              |
| ----------------------------------- | ------------------------------- |
| `--s-dialog-width`                  | `320px`                         |
| `--s-dialog-max-width`              | `90%`                           |
| `--s-dialog-border-color`           | `var(--s-border-color)`         |
| `--s-dialog-bg`                     | `var(--s-bg-color-elevated)`    |
| `--s-dialog-radius`                 | `var(--s-border-radius-xl)`     |
| `--s-dialog-header-padding-y`       | `var(--s-size)`                 |
| `--s-dialog-header-padding-x`       | `var(--s-size)`                 |
| `--s-dialog-body-padding-x`         | `var(--s-size)`                 |
| `--s-dialog-body-padding-y`         | `var(--s-size-xl)`              |
| `--s-dialog-body-gap`               | `var(--s-size-xs)`              |
| `--s-dialog-title-font-size`        | `var(--s-font-size-lg)`         |
| `--s-dialog-title-headed-font-size` | `var(--s-font-size)`            |
| `--s-dialog-close-font-size`        | `var(--s-font-size-lg)`         |
| `--s-dialog-message-font-size`      | `var(--s-font-size)`            |
| `--s-dialog-message-color`          | `var(--s-text-color-secondary)` |
| `--s-dialog-footer-round-padding-x` | `var(--s-size)`                 |
| `--s-dialog-footer-round-padding-y` | `var(--s-size)`                 |
| `--s-dialog-footer-round-gap`       | `var(--s-size)`                 |
