# Avatar 头像

### 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

### 引入

```ts
import { Avatar } from 'sard'
```

## 代码演示

### 基础使用

默认展示一个人头图标。

@code('${DEMO_PATH}/avatar/demo/Basic.tsx')

### 形状

可以将其改为带圆角的方形。

@code('${DEMO_PATH}/avatar/demo/Shape.tsx')

### 图标大小

修改里面图标的尺寸大小。

@code('${DEMO_PATH}/avatar/demo/IconSize.tsx')

### 头像尺寸

修改外面框框的尺寸大小。

@code('${DEMO_PATH}/avatar/demo/Size.tsx')

### 图片类型

通过 `src` 配置图片路径将展示一个完全覆盖框框的图片。

@code('${DEMO_PATH}/avatar/demo/Picture.tsx')

### 自定义内容

`children` 属性配置的内容会代替默认的内容。

@code('${DEMO_PATH}/avatar/demo/Children.tsx')

### 自定义样式

`iconProps` 属性可以用来配置图标的样式。

@code('${DEMO_PATH}/avatar/demo/Style.tsx')

### 额外内容

`extra` 属性可以展示例如徽标等组件。要使徽标固定在圆角形状头像右上角边边上可以使用 `14.6447%` 的固定值。

@code('${DEMO_PATH}/avatar/demo/Extra.tsx')

### 头像组

要使多个头像堆叠在一起可以使用头像组组件将其包裹。

@code('${DEMO_PATH}/avatar/demo/Group.tsx')

### 间距

使用 `gap` 属性调整头像间的距离，要产生堆叠效果，需要使用负间距。

@code('${DEMO_PATH}/avatar/demo/Gap.tsx')

### 方向

默认堆叠是右边压着左边，也可以通过 `direction` 配置左边压着右边。

@code('${DEMO_PATH}/avatar/demo/Direction.tsx')

### 最大头像个数

使用 `maxCount` 可以配置最多展示的头像数量，最后一个头像展示剩余的头像个数。

@code('${DEMO_PATH}/avatar/demo/MaxCount.tsx')

## API

### AvatarProps

| 属性      | 描述                      | 类型                 | 默认值   |
| --------- | ------------------------- | -------------------- | -------- |
| shape     | 头像形状                  | 'circle' \| 'square' | 'circle' |
| size      | 头像尺寸                  | number               | -        |
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

### SCSS 变量

@code('./index.scss#variables')
