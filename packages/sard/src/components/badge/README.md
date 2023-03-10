# Badge 徽标

### 介绍

用于在各组件右上角显示消息数量以吸引用户处理。

### 引入

```js
import { Badge } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Max.tsx",
    "./demo/ShowZero.tsx",
    "./demo/Dot.tsx",
    "./demo/Color.tsx",
    "./demo/Alone.tsx",
    "./demo/Custom.tsx",
    "./demo/Unwrap.tsx"
  ]
</script>

## API

### BadgeProps

| 属性      | 描述                                                       | 类型                      | 默认值 |
| --------- | ---------------------------------------------------------- | ------------------------- | ------ |
| value     | 展示的数字                                                 | number \| React.ReactNode | 0      |
| max       | 默认超过 99 的值会显示 99+，可以通过 max 设置最大显示数值  | number                    | 99     |
| showZero  | 值为 0 时，会隐藏，可通过 `showZero` 让其值为 0 时依然显示 | boolean                   | false  |
| color     | 自定义背景颜色                                             | string                    | -      |
| textColor | 自定义文字颜色                                             | string                    | -      |
| isDot     | 显示圆点                                                   | boolean                   | false  |
| fixed     | 是否定位到右上角                                           | boolean                   | false  |

## 主题定制

### SCSS

```scss

```
