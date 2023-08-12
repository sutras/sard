# Navbar 头部导航

### 介绍

在页面顶部的导航栏。

### 引入

```js
import { Navbar } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/navbar/demo/Basic.tsx)

### 导航项

可以在 `left/right` 插槽中放置导航项。

%(${DEMO_PATH}/navbar/demo/Item.tsx)

### 流动导航

默认标题居中， `left/right` 绝对定位于左右两侧；可以使用 `flow` 使其变为流动布局。

%(${DEMO_PATH}/navbar/demo/Flow.tsx)

### 自定义 content

%(${DEMO_PATH}/navbar/demo/Content.tsx)

### 固定在顶部

%(${DEMO_PATH}/navbar/demo/Fixed.tsx)

## API

### NavbarProps

| 属性     | 描述                                                                               | 类型             | 默认值 |
| -------- | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| children | 自定义内容                                                                         | React.ReactNode  | -      |
| title    | 自定义标题                                                                         | React.ReactNode  | -      |
| left     | 自定义左侧区域内容                                                                 | React.ReactNode  | -      |
| right    | 自定义右侧区域内容                                                                 | React.ReactNode  | -      |
| flow     | 默认 `left/right` 绝对定位于左右两侧，标题居中；可以使用 `flow` 使其变为流动布局。 | boolean          | false  |
| fixed    | 固定到顶部                                                                         | boolean          | false  |
| zIndex   | 固定定位时的层级                                                                   | string \| number | 1      |

### NavbarItemProps

| 属性    | 描述       | 类型                         | 默认值 |
| ------- | ---------- | ---------------------------- | ------ |
| onClick | 点击时触发 | (event: ITouchEvent) => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
