# Avatar 头像

### 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

### 引入

```js
import { Avatar } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Shape.tsx",
    "./demo/IconSize.tsx",
    "./demo/Size.tsx",
    "./demo/Image.tsx",
    "./demo/Slot.tsx",
    "./demo/Style.tsx",
    "./demo/Extra.tsx",
    "./demo/Group.tsx",
    "./demo/Gap.tsx",
    "./demo/Direction.tsx",
    "./demo/MaxCount.tsx"
  ]
</script>

## API

### AvatarProps

| 属性      | 描述                      | 类型                 | 默认值   |
| --------- | ------------------------- | -------------------- | -------- |
| shape     | 头像形状                  | 'circle' \| 'square' | 'circle' |
| size      | 头像尺寸                  | number \| string     | -        |
| iconSize  | 图标大小                  | number \| string     | -        |
| src       | 图片类型头像的图片地址    | string               | -        |
| iconProps | `Icon` 组件的 `IconProps` | IconProps            | -        |
| extra     | 额外内容，常用于展示徽标  | React.ReactNode      | -        |

### AvatarGroupProps

| 属性      | 描述         | 类型              | 默认值  |
| --------- | ------------ | ----------------- | ------- |
| gap       | 头像间距     | string \| number  | -       |
| direction | 头像排列方向 | 'left' \| 'right' | 'right' |
| maxCount  | 最大头像个数 | number            | 5       |

## 主题定制

### SCSS

```scss

```
