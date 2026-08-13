---
title: 暗黑模式
order: 3
group:
  title: 进阶
---

## 介绍

`sard` 使用 CSS 变量声明组件的颜色、字号、圆角等样式，暗黑模式通过为 `<html>` 添加 `.dark` 类来覆盖这些变量值，因此切换主题非常简单。

## 开启暗黑模式

在 `<html>` 上添加 `.dark` 类即可切换到暗黑模式：

```html
<html class="dark">
  ...
</html>
```

## 编程式控制

如果希望在 JavaScript 中动态管理颜色方案，`sard` 提供了 `provideColorScheme` 和 `useColorScheme`。

在入口文件中调用 `provideColorScheme`，它会根据用户偏好自动在 `<html>` 上添加/移除 `.dark` 类：

```ts
// main.ts
import { createApp } from 'vue'
import { provideColorScheme } from 'sard'
import App from './App.vue'

const app = createApp(App)
provideColorScheme(app)
app.mount('#app')
```

### 主题模式

`provideColorScheme` 提供三种主题模式：

| 模式 | 值        | 说明                                     |
| ---- | --------- | ---------------------------------------- |
| 浅色 | `'light'` | 强制使用浅色主题                         |
| 深色 | `'dark'`  | 强制使用深色主题                         |
| 自动 | `'auto'`  | 跟随系统 `prefers-color-scheme` 自动切换 |

默认值为 `'auto'`，用户的选择会持久化到 `localStorage`（key 为 `Sard:colorScheme`）。

## 动态切换示例

通过 `useColorScheme` 在任意组件中读取和切换主题：

```vue
<template>
  <div>
    <span>当前主题：{{ appliedColorScheme }}</span>
    <button v-for="item in options" :key="item.value" @click="colorScheme = item.value">
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useColorScheme } from 'sard'
import type { ColorScheme } from 'sard'

const { colorScheme, appliedColorScheme } = useColorScheme()

const options: { label: string; value: ColorScheme }[] = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '自动', value: 'auto' },
]
</script>
```

- `colorScheme` — 用户选择的偏好模式，修改即生效
- `appliedColorScheme` — 实际应用的配色（`'auto'` 时跟随系统，否则等于 `colorScheme`）

## API

### provideColorScheme

在应用入口注入颜色方案上下文，自动管理 `<html>` 上的 `.dark` 类并持久化用户偏好。

```ts
function provideColorScheme(app: App): ColorSchemeContext
```

| 参数  | 类型  | 说明         |
| ----- | ----- | ------------ |
| `app` | `App` | Vue 应用实例 |

---

### useColorScheme

在任意组件中读取或切换颜色方案。**响应式**，修改 `colorScheme` 后主题立即切换。

```ts
function useColorScheme(): ColorSchemeContext
```

**返回值：**

| 属性                 | 类型                              | 说明                                                          |
| -------------------- | --------------------------------- | ------------------------------------------------------------- |
| `colorScheme`        | `Ref<ColorScheme>`                | 用户选择的模式，赋值即切换并持久化到 `localStorage`           |
| `appliedColorScheme` | `ComputedRef<AppliedColorScheme>` | 实际生效的配色，`auto` 模式下跟随系统，否则等于 `colorScheme` |

**类型：**

```ts
type ColorScheme = 'dark' | 'light' | 'auto'
type AppliedColorScheme = 'dark' | 'light'
```
