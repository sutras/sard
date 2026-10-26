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

组件代码与样式是分开的：组件的入口文件（`sard/components/button`）不包含任何样式引入，样式由你按需引入。

每个组件都有一个独立的样式入口 `sard/components/<组件名>/style`，它已经包含该组件**依赖组件**的样式（例如 `Button` 会带上 `Loading`），所以每个用到的组件引一次就够：

```ts
// main.ts
import 'sard/components/button/style'
import 'sard/components/input/style'
```

没用到的组件，其样式不会被打包。

如果更倾向于一次性引入全部样式（例如使用 `installer` 全量注册组件时）：

```ts
import 'sard/index.css'
```

::: tip
`sard/components/<组件名>/index.css` 也存在，但只包含该组件自身的样式，不含依赖组件，一般不建议直接使用。
:::

如果要自定义主题变量，见[定制主题](./theme)。

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
