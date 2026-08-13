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

## 引入

### 引入样式

```ts
import 'sard/index.css'
```

### 引入组件

```ts
import { Button } from 'sard'
```

## 使用

```vue
<template>
  <Button>按钮</Button>
</template>

<script setup lang="ts">
import { Button } from 'sard'
</script>
```
