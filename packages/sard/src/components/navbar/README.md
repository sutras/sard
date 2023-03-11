# Navbar 头部导航

### 介绍

在页面顶部的导航栏。

### 引入

```js
import { Navbar } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Item.tsx",
    "./demo/Content.tsx",
    "./demo/Flow.tsx",
    "./demo/Fixed.tsx"
  ]
</script>

## API

### NavbarProps

| 属性     | 描述                                                                               | 类型             | 默认值 |
| -------- | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| children | 自定义内容                                                                         | React.ReactNode  | -      |
| title    | 自定义标题                                                                         | React.ReactNode  | -      |
| prepend  | 自定义左侧区域内容                                                                 | React.ReactNode  | -      |
| append   | 自定义右侧区域内容                                                                 | React.ReactNode  | -      |
| flow     | 默认 prepend/append 绝对定位于左右两侧，标题居中；可以使用 flow 使其变为流动布局。 | boolean          | false  |
| fixed    | 固定到顶部                                                                         | boolean          | false  |
| zIndex   | 固定定位时的层级                                                                   | string \| number | 1      |

### NavbarItemProps

| 属性    | 描述       | 类型                        | 默认值 |
| ------- | ---------- | --------------------------- | ------ |
| onClick | 点击时触发 | (event: MouseEvent) => void | -      |

## 主题定制

### CSS 变量

%{variables}
