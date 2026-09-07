---
title: 阻止页面返回
order: 5
group:
  title: 进阶
---

## 介绍

`sard` 的弹层类组件（`Popup`、`Popout`、`Dialog`、`ActionSheet`、`PreviewImage`、`ShareSheet`、`CropImage` 等）均支持 `closeOnBackPress` 属性。

在 H5 内嵌于原生 App（`webview`）等场景下，当弹层打开时若用户触发系统返回手势/返回键，默认行为往往是直接退出当前页面，而不是先关闭弹层，这不符合移动端的使用习惯。

`sard` 通过一个统一的弹层栈 `popupManager` 来解决该问题：开启 `closeOnBackPress` 的弹层在展示期间会被登记到栈中，宿主可据此判断"当前是否有弹层打开"，从而在收到系统返回事件时优先关闭栈顶的弹层，阻止页面返回。

## 工作原理

弹层组件内部通过 `popupManager` 维护一个**响应式**的弹层栈，工作流程如下：

- 弹层进入展示阶段（`before-enter`）时，若 `closeOnBackPress` 为 `true`，会自动将一个关闭项推入 `popupManager.stack`；
- 弹层关闭动画结束（`after-leave`）或组件卸载时，会将自己从栈中移除；
- 调用 `popupManager.pop()` 会弹出并关闭栈顶（最后展示）的弹层。

::: tip

弹层栈遵循"后进先出（LIFO）"的规则，即始终优先关闭最后打开的弹层，因此多个弹层嵌套展示时行为与预期一致。

:::

## closeOnBackPress

各弹层组件的 `closeOnBackPress` 默认值如下：

| 组件           | 默认值  | 说明                                 |
| -------------- | ------- | ------------------------------------ |
| `Popup`        | `false` | 基础弹层，默认不开启，需要时手动设置 |
| `Popout`       | `true`  | 底部弹层，如选择器、底部操作内容     |
| `Dialog`       | `true`  | 对话框                               |
| `ActionSheet`  | `true`  | 动作面板                             |
| `PreviewImage` | `true`  | 图片预览                             |
| `ShareSheet`   | `true`  | 分享面板                             |
| `CropImage`    | `true`  | 图片裁剪                             |

其中除基础组件 `Popup` 外，其余组件默认均为 `true`。

```vue
<template>
  <Popup v-model:visible="visible" :close-on-back-press="true">...</Popup>
</template>
```

## popupManager

`popupManager` 由 `sard` 从 `components/popup` 导出，为一个全局的单例对象：

```ts
import { popupManager } from 'sard'
```

其类型定义如下：

```ts
export interface PopupItem {
  close: () => void
}

export interface PopupManager {
  // 弹层栈（响应式，可被 watch 监听）
  stack: PopupItem[]
  // 向栈顶推入一个关闭项（已存在时忽略）
  push(item: PopupItem): void
  // 弹出并关闭栈顶弹层
  pop(): void
  // 从栈中移除指定关闭项
  remove(item: PopupItem): void
}
```

因为 `stack` 是响应式的，可以直接使用 `watch` 监听其长度变化。

## 与原生端（webview）集成

以某一宿主 App 为例，H5 运行在其 `webview` 中。当页面内有弹层打开时应通知 App 拦截系统返回，避免直接退出页面；当所有弹层关闭后再恢复 App 默认的返回行为。

可封装为一个工具模块，示例代码如下：

```ts
// src/utils/back-press.ts
import { popupManager } from 'sard'
import { watch } from 'vue'

// 通过原生桥通知宿主 App 是否需要拦截系统返回
// 具体桥调用因宿主而异，此处仅作示意，请按实际项目接入实现
const notifyNative = (intercept: boolean) => {
  // appBridge?.call('isInterceptBack', { isIntercept: intercept ? 1 : 0 })
}

// 弹层栈变化时，同步通知宿主 App 是否需要拦截系统返回
watch(
  () => popupManager.stack.length,
  (len) => {
    notifyNative(len > 0)
  },
)

// 宿主 App 拦截到系统返回事件后，回调到 H5，关闭栈顶弹层
window.onBackPress = () => {
  popupManager.pop()
}
```

其中 `notifyNative` 只是占位示意，用于通过项目接入的原生桥方法，将"当前是否需要拦截返回"通知给宿主 App（不同宿主暴露的桥名称与调用方式各不相同，请按实际项目替换），整体流程如下：

1. 任意开启 `closeOnBackPress` 的弹层打开时，`popupManager.stack` 长度变为非 0，`watch` 触发，通知 App 启用返回拦截；
2. 此时用户触发系统返回手势/返回键，App 拦截该事件并回调 `window.onBackPress()`；
3. H5 调用 `popupManager.pop()` 关闭栈顶弹层，弹层执行关闭动画并触发 `back-press` 事件；
4. 当所有弹层关闭后，栈长度归 0，`watch` 再次触发并通知 App 关闭拦截，页面返回恢复为原生默认行为。

通过以上方式，即可实现"弹层打开时阻止页面返回，返回时优先逐层关闭弹层"的效果。
