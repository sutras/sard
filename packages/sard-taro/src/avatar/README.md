# Avatar 头像

### 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

### 引入

```js
import { Avatar } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/avatar/demo/Basic.tsx)

### 形状

%(${DEMO_PATH}/avatar/demo/Shape.tsx)

### 图标大小

%(${DEMO_PATH}/avatar/demo/IconSize.tsx)

### 头像尺寸

%(${DEMO_PATH}/avatar/demo/Size.tsx)

### 图片类型

%(${DEMO_PATH}/avatar/demo/Picture.tsx)

### 自定义内容

%(${DEMO_PATH}/avatar/demo/Children.tsx)

### 自定义样式

%(${DEMO_PATH}/avatar/demo/Style.tsx)

### 额外内容

%(${DEMO_PATH}/avatar/demo/Extra.tsx)

### 头像组

%(${DEMO_PATH}/avatar/demo/Group.tsx)

### 间距

%(${DEMO_PATH}/avatar/demo/Gap.tsx)

### 方向

%(${DEMO_PATH}/avatar/demo/Direction.tsx)

### 最大头像个数

%(${DEMO_PATH}/avatar/demo/MaxCount.tsx)

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

### CSS 变量

%(./index.scss#variables)
