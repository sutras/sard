# Empty 空状态

### 介绍

空状态时的占位提示。

### 引入

```js
import { Empty } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Description.tsx",
    "./demo/Size.tsx",
    "./demo/Image.tsx",
    "./demo/Extra.tsx"
  ]
</script>

## API

### EmptyProps

| 属性        | 描述                   | 类型            | 默认值     |
| ----------- | ---------------------- | --------------- | ---------- |
| children    | 放置额外内容           | React.ReactNode | -          |
| icon        | 自定义图标             | React.ReactNode | -          |
| iconProps   | 图标组件的 `iconProps` | IconProps       | -          |
| description | 描述信息               | React.ReactNode | '暂无数据' |

## 主题定制

### CSS 变量

%{variables}
