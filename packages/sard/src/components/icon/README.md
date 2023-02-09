# Icon 图标

### 介绍

基于字体的图标集。

### 引入

```js
import { Icon } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/NonPrefix.tsx",
    "./demo/Size.tsx",
    "./demo/Color.tsx",
    "./demo/Image.tsx",
    "./demo/Internal.tsx"
  ]
</script>

## API

### IconProps

| 属性   | 描述                                                     | 类型             | 默认值 |
| ------ | -------------------------------------------------------- | ---------------- | ------ |
| name   | 图标名称或图片链接，如果名称带有/，会被认为是图片图标    | string           | ''     |
| prefix | 类名前缀，会作为独立类名，并拼接上 `name` 形成另一个类名 | string           | -      |
| size   | 图标大小                                                 | string \| number | -      |
| color  | 图标颜色                                                 | string           | -      |

## 主题定制

### SCSS

```scss

```
