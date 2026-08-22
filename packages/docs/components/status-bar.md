---
title: StatusBar
subtitle: 状态栏
group: 布局
---

## 介绍

用于状态栏占位，`Navbar`、`Notify` 等定位在顶部的元素会使用到。

如果应用是嵌套在 APP 的 webview 中，可以通过 APP 提供的接口获取状态栏高度并赋值给 `windowInfo.statusBarHeight`。这是一个响应式对象，当 `statusBarHeight` 属性改变时，会同时设置一个在 html 上的 css 变量：`--s-status-bar-height`，如果有需要的话，可以使用此 css 变量。

```ts [main.ts]
import { windowInfo } from 'sard'

// 假设 `getStatusBarHeight()` 方法是 APP 注入的全局对象。
windowInfo.statusBarHeight = window.getStatusBarHeight()
```

## 代码演示

### 基础使用

<<< @demo/status-bar/demo/Basic.vue
