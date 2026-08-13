---
title: 全局配置
order: 4
group:
  title: 进阶
---

## 自定义组件默认属性

每个组件实例都挂载了 `setPropsDefaults` 方法，可用于在全局范围内覆盖该组件的默认属性值。

例如，将 `Button` 的默认类型改为 `outlined`、颜色改为 `secondary`：

```ts
// main.ts
import { Button } from 'sard'

Button.setPropsDefaults({
  variant: 'outlined',
  color: 'secondary',
})
```

::: tip

请注意，必须在组件初始化之前执行。

配置的默认值是全局的。 一旦设置，它们将应用于注册了该组件的所有Vue应用程序。

组件首次渲染后，其默认值将变为不可变，无法再更改。

:::

## 窗口信息

`windowInfo` 是一个响应式对象，提供设备窗口的相关信息：

| 属性              | 说明       |
| ----------------- | ---------- |
| `pixelRatio`      | 设备像素比 |
| `screenWidth`     | 屏幕宽度   |
| `screenHeight`    | 屏幕高度   |
| `windowWidth`     | 窗口宽度   |
| `windowHeight`    | 窗口高度   |
| `statusBarHeight` | 状态栏高度 |
| `navBarHeight`    | 导航栏高度 |
| `tabBarHeight`    | 标签栏高度 |

在全屏的 `webview` 中，浏览器无法自动获取系统状态栏高度（默认为 `0`），需要手动设置 `windowInfo.statusBarHeight` 的值，以便 `StatusBar`、`Navbar` 等组件正确计算布局偏移：

```ts
import { windowInfo } from 'sard'

// 在 App.vue 或入口文件中，根据平台设置状态栏高度（单位 px）
windowInfo.statusBarHeight = 44
```

`navBarHeight` 由 `Navbar` 组件自动管理：当 `Navbar` 设置 `fixed` 属性时，会自动更新 `windowInfo.navBarHeight = 44`，组件卸载时重置为 `0`。如需自定义导航栏高度，也可手动设置。

## 安全区域

`safeAreaInsets` 是一个响应式对象，提供安全区域边距信息，常用于适配刘海屏等设备：

| 属性     | 说明                                                                        |
| -------- | --------------------------------------------------------------------------- |
| `top`    | 顶部安全距离，等于 `statusBarHeight + navBarHeight`，用于避开状态栏和导航栏 |
| `left`   | 左侧安全距离，当前固定为 `0`                                                |
| `right`  | 右侧安全距离，当前固定为 `0`                                                |
| `bottom` | 底部安全距离，等于 `tabBarHeight`，用于避开底部标签栏                       |
