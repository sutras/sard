---
title: Toast
subtitle: 轻提示
group: 反馈组件
---

## 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态。

## 代码演示

### 基础使用

使用 `toast` 等方法显示提示。

<<< @demo/toast/demo/Basic.vue

### 自定义位置

`Toast` 默认渲染在屏幕正中位置，通过 `position` 属性可以控制提示展示的位置。

<<< @demo/toast/demo/Placement.vue

### 加载中的背景

默认显示加载类型的提示不会显示遮罩背景，设置 `overlay: true` 会显示黑色遮罩， 设置 `transparent: true` 会让背景变透明。

<<< @demo/toast/demo/Mask.vue

### 自定义图标

<<< @demo/toast/demo/Icon.vue

## API

### ToastProps

| 属性        | 描述                     | 类型                                       | 默认值   |
| ----------- | ------------------------ | ------------------------------------------ | -------- |
| type        | 提示框类型               | 'text' \| 'loading' \| 'success' \| 'fail' | 'text'   |
| title       | 标题                     | string \| number                           | -        |
| visible     | 是否可见                 | boolean                                    | -        |
| position    | 提示框垂直方向放置的位置 | 'top' \| 'center' \| 'bottom'              | 'center' |
| overlay     | 是否显示背景遮罩         | boolean                                    | false    |
| transparent | 使背景透明               | boolean                                    | false    |
| timeout     | 提示的延迟时间，单位 ms  | number                                     | 1500     |

### ToastSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标     | -    |
| title   | 自定义标题     | -    |

### ToastEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述             | 类型                         |
| -------------- | ---------------- | ---------------------------- |
| update:visible | 提示框显隐时触发 | `(visible: boolean) => void` |

### 命令式方法

| 名称          | 描述                       | 类型                     |
| ------------- | -------------------------- | ------------------------ |
| toast         | 显示提示                   | ToastFunction            |
| toast.success | 显示成功类型提示           | ToastSimpleShowFunction  |
| toast.fail    | 显示失败类型提示           | ToastSimpleShowFunction  |
| toast.loading | 显示加载类型提示           | ToastSimpleShowFunction  |
| toast.hide    | 隐藏指定 `id` 的命令式提示 | `(id = 'toast') => void` |
| toast.hideAll | 隐藏所有命令式提示         | `() => void`             |

### ToastFunction

```ts
type ToastFunction = ToastSimpleShowFunction & {
  success: ToastSimpleShowFunction
  fail: ToastSimpleShowFunction
  loading: ToastSimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}
```

### ToastSimpleShowFunction

```ts
interface ToastSimpleShowFunction {
  (options: ToastOptions): void
  (title?: string | number, options?: ToastOptions): void
}
```

## 主题定制

### 样式变量

| CSS 变量                         | 值                           |
| -------------------------------- | ---------------------------- |
| `--s-toast-top`                  | `10%`                        |
| `--s-toast-bottom`               | `10%`                        |
| `--s-toast-font-size`            | `var(--s-font-size)`         |
| `--s-toast-width`                | `120px`                      |
| `--s-toast-min-height-icon-only` | `var(--s-toast-width)`       |
| `--s-toast-padding-x`            | `var(--s-size)`              |
| `--s-toast-padding-y`            | `var(--s-size)`              |
| `--s-toast-border-radius`        | `var(--s-border-radius-lg)`  |
| `--s-toast-color`                | `var(--s-white)`             |
| `--s-toast-bg`                   | `var(--s-overlay-illegible)` |
| `--s-toast-text-max-width`       | `80%`                        |
| `--s-toast-text-padding-y`       | `10px`                       |
| `--s-toast-icon-margin-bottom`   | `var(--s-size-xs)`           |
| `--s-toast-icon-size`            | `36px`                       |
| `--s-toast-icon-loading-size`    | `30px`                       |
| `--s-toast-title-font-size`      | `var(--s-toast-font-size)`   |
