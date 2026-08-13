---
title: Notify
subtitle: 消息通知
group: 反馈组件
---

## 介绍

在页面顶部展示消息通知。

## 代码演示

### 基础使用

使用 `notify` 等方法显示提示。

<<< @demo/notify/demo/Basic.vue

### 类型

支持 `primary、success、warning、error` 四种通知类型，默认为 `primary`

<<< @demo/notify/demo/Type.vue

### 自定义颜色

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

<<< @demo/notify/demo/Color.vue

### 自定义时长

`timeout` 设为 0 后会一直显示。

<<< @demo/notify/demo/Duration.vue

### 自定义位置

通知允许在屏幕上边或下边展示。

<<< @demo/notify/demo/Placement.vue

## API

### NotifyProps

| 属性       | 描述                                  | 类型                                           | 默认值    |
| ---------- | ------------------------------------- | ---------------------------------------------- | --------- |
| type       | 加载类型                              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message    | 通知内容                              | string                                         | -         |
| color      | 字体颜色                              | string                                         | -         |
| background | 背景色                                | string                                         | -         |
| visible    | 是否显示通知                          | boolean                                        | -         |
| position   | 通知放置的位置                        | 'top' \| 'bottom'                              | 'top'     |
| timeout    | 展示时长(ms)，值为 0 时，通知不会消失 | number                                         | 3000      |
| status-bar | 是否包含状态栏                        | boolean                                        | true      |

### NotifySlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### NotifyEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述             | 类型                          |
| -------------- | ---------------- | ----------------------------- |
| update:visible | 通知框显隐时触发 | `(visible: boolean) => void`  |
| click          | 点击通知框时触发 | `(event: MouseEvent) => void` |

### 命令式方法

| 名称           | 描述             | 类型                     |
| -------------- | ---------------- | ------------------------ |
| notify         | 显示通知         | NotifyFunction           |
| notify.success | 显示成功类型通知 | NotifySimpleShowFunction |
| notify.warning | 显示警告类型通知 | NotifySimpleShowFunction |
| notify.error   | 显示错误类型通知 | NotifySimpleShowFunction |
| notify.hide    | 隐藏命令式通知   | `() => void`             |

### NotifyFunction

```ts
type NotifyFunction = NotifySimpleShowFunction & {
  success: NotifySimpleShowFunction
  warning: NotifySimpleShowFunction
  error: NotifySimpleShowFunction
  hide: () => void
}
```

### NotifySimpleShowFunction

```ts
interface NotifySimpleShowFunction {
  (optionsOrMessage?: string | NotifyOptions, options?: NotifyOptions): void
}
```

## 主题定制

### 样式变量

| CSS 变量               | 值                           |
| ---------------------- | ---------------------------- |
| `--s-notify-padding-x` | `var(--s-content-padding-x)` |
| `--s-notify-padding-y` | `var(--s-content-padding-y)` |
| `--s-notify-font-size` | `var(--s-font-size)`         |
| `--s-notify-color`     | `var(--s-white)`             |
