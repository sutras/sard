---
title: Popout
subtitle: 弹出框
group: 数据展示
---

## 介绍

底部弹出框，可以控制组件的展示与交互，可作为其他组件的弹出框容器。

Popout 组件基于 Popup 组件。

## 代码演示

### 基础使用

使用 `visible`属性控制显隐，使用 `title` 属性设置标题。

<<< @demo/popout/demo/Basic.vue

### 宽松类型

通过将 `type` 设为 `loose` 可以将确定/取消按钮放到底部，并添加右上角的关闭按钮。

<<< @demo/popout/demo/Loose.vue

### 异步关闭

如果 `beforeClose` 返回 false，则取消关闭弹出框；如果返回 `Promise` 对象，则会在 `resolve` 时才关闭弹出框。

<<< @demo/popout/demo/BeforeClose.vue

## API

### PopoutProps

| 属性             | 描述                                                                 | 类型                 | 默认值    |
| ---------------- | -------------------------------------------------------------------- | -------------------- | --------- |
| title            | 弹出框标题                                                           | string               | -         |
| show-cancel      | 是否显示取消按钮，适用 `loose` 类型                                  | boolean              | false     |
| cancel-text      | 取消按钮文案                                                         | string               | '取消'    |
| show-confirm     | 是否显示确定按钮，适用 `loose` 类型                                  | boolean              | true      |
| confirm-text     | 确定按钮文案                                                         | string               | '确定'    |
| confirm-disabled | 是否禁用确定按钮                                                     | boolean              | false     |
| show-close       | 是否显示关闭按钮，适用 `loose` 类型                                  | boolean              | true      |
| show-footer      | 是否显示底部按钮                                                     | boolean              | true      |
| type             | 弹出框按钮排版方式                                                   | 'compact' \| 'loose' | 'compact' |
| visible          | 是否显示弹出框                                                       | boolean              | -         |
| before-close     | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | PopoutBeforeClose    | -         |
| duration         | 显隐动画时长，单位 ms                                                | number               | 300       |
| overlay          | 是否显示遮罩                                                         | boolean              | true      |
| overlay-class    | 添加到遮罩的类名                                                     | string               | -         |
| overlay-style    | 添加到遮罩的样式                                                     | string               | -         |
| background       | 遮罩背景色                                                           | string               | -         |
| transparent      | 透明遮罩                                                             | boolean              | false     |
| overlay-closable | 点击遮罩是否关闭                                                     | boolean              | true      |
| lazy             | 是否延迟渲染弹窗内容（在弹窗初次显示时才渲染）                       | boolean              | true      |
| destroy-on-close | 在关闭弹窗时是否销毁内容                                             | boolean              | false     |
| show-shadow      | 是否显示阴影，在无遮罩时将弹窗与页面分隔                             | boolean              | false     |

### PopoutBeforeClose

- 当点击确定按钮时，`type` 为 `confirm`；
- 当点击取消按钮时，`type` 为 `cancel`；
- 当点击关闭按钮或遮罩时，`type` 为 `close`。

`loading` 表示当前哪个按钮处于异步关闭状态。

```ts
type PopoutBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any
```

### PopoutSlots

| 插槽          | 描述               | 属性                                                                          |
| ------------- | ------------------ | ----------------------------------------------------------------------------- |
| default       | 自定义主体内容     | -                                                                             |
| title         | 自定义标题         | -                                                                             |
| title-prepend | 自定义标题前面内容 | -                                                                             |
| cancel        | 自定义取消按钮内容 | `{ onClick: () => void; loading: boolean; text: string }`                     |
| confirm       | 自定义确定按钮内容 | `{ onClick: () => void; loading: boolean; text: string; disabled?: boolean }` |

### PopoutEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述                     | 类型                         |
| -------------- | ------------------------ | ---------------------------- |
| update:visible | 显隐时触发               | `(visible: boolean) => void` |
| close          | 点击关闭按钮或遮罩时触发 | `() => void`                 |
| cancel         | 点击取消按钮时触发       | `() => void`                 |
| confirm        | 点击确定按钮时触发       | `() => void`                 |

### FormPopoutProps

所有表单类 popout 组件（如 CheckboxPopout、PickerPopout、SelectPopout 等）共享的 Props，用于统一管理弹窗外观与表单交互行为。

| 属性           | 描述                                     | 类型    | 默认值 |
| -------------- | ---------------------------------------- | ------- | ------ |
| visible        | 是否显示弹出框                           | boolean | false  |
| title          | 弹出框标题                               | string  | -      |
| show-confirm   | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean | true   |
| validate-event | 是否触发表单验证                         | boolean | true   |
| resettable     | 关闭弹出框后，是否可复位弹出框草稿值     | boolean | false  |

## 主题定制

### 样式变量

| CSS 变量                            | 值                              |
| ----------------------------------- | ------------------------------- |
| `--s-popout-border-radius`          | `var(--s-border-radius-xl)`     |
| `--s-popout-bg`                     | `var(--s-bg-color-elevated)`    |
| `--s-popout-close-padding`          | `var(--s-size)`                 |
| `--s-popout-close-font-size`        | `var(--s-font-size-lg)`         |
| `--s-popout-close-color`            | `var(--s-text-color-secondary)` |
| `--s-popout-header-compact-height`  | `var(--s-content-height)`       |
| `--s-popout-header-loose-height`    | `var(--s-content-height)`       |
| `--s-popout-header-loose-padding-x` | `60px`                          |
| `--s-popout-title-font-size`        | `var(--s-font-size-lg)`         |
| `--s-popout-title-color`            | `var(--s-text-color-emphasis)`  |
| `--s-popout-footer-padding-y`       | `var(--s-content-padding-y)`    |
| `--s-popout-footer-padding-x`       | `var(--s-content-padding-x)`    |
| `--s-popout-button-gap`             | `var(--s-size)`                 |
