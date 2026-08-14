---
title: 快速上手
order: 2
group:
  title: 基础
---

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install sard
```

```bash [pnpm]
pnpm add sard
```

```bash [yarn]
yarn add sard
```

```bash [bun]
bun add sard
```

:::

## 引入样式

```ts
import 'sard/index.css'
```

## 按需引入

直接导入需要使用的组件，结合打包工具的 `Tree Shaking`，最终只会打包你用到的组件：

```ts
import { Button } from 'sard'
```

## 全量引入

如果想一次性注册全部组件，可以使用 `installer`：

```ts
// main.ts
import { createApp } from 'vue'
import { installer } from 'sard'
import App from './App.vue'

const app = createApp(App)

// 注册全部组件，组件名默认为 s- 前缀（如 <s-button>）
app.use(installer)

app.mount('#app')
```

## prepareEnvironment

`prepareEnvironment` 用于初始化全局环境。调用后，`sard` 会响应式地将 `windowInfo.statusBarHeight` 同步到 CSS 变量 `--s-status-bar-height`，供 `PreviewImage`、`Signature` 等全屏组件的样式使用。

在应用入口处调用一次即可：

```ts
// main.ts
import { prepareEnvironment } from 'sard'

prepareEnvironment()
```

::: tip
在全屏 `webview` 中，浏览器无法自动获取系统状态栏高度（默认为 `0`），需要手动设置 `windowInfo.statusBarHeight`，详见[全局配置](./config#窗口信息)。
:::

## 使用

```vue
<template>
  <Button>按钮</Button>
</template>

<script setup lang="ts">
import { Button } from 'sard'
</script>
```
