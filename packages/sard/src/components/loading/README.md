# Loading 加载

### 介绍

表示处理中的状态。

### 引入

```js
import { Loading } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Size.tsx",
    "./demo/Color.tsx",
    "./demo/Text.tsx",
    "./demo/Vertical.tsx"
  ]
</script>

## API

### LoadingProps

| 名称     | 描述                   | 类型                               | 默认值    |
| -------- | ---------------------- | ---------------------------------- | --------- |
| type     | 加载类型               | 'spinner' \| 'clock' \| 'circular' | 'spinner' |
| color    | 加载颜色               | string                             | -         |
| size     | 加载尺寸               | string \| number                   | -         |
| text     | 加载文案               | React.ReactNode                    | -         |
| vertical | 是否垂直排列图标和文案 | boolean                            | false     |

## 主题定制

### CSS 变量

%{variables}
