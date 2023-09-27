# Mesh 宫格

### 介绍

将多个类目进行等宽排列，用于内容展示或者页面导航。

### 引入

```ts
import { Mesh } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `text` 属性设置文本内容，使用 `iconProps` 属性设置图标。

%(${DEMO_PATH}/mesh/demo/Basic.tsx)

### 隐藏边框

隐藏边框后看起来更加简洁。

%(${DEMO_PATH}/mesh/demo/Border.tsx)

### 自定义列数

默认一行展示四个格子，可以通过 `columns` 自定义列数。

%(${DEMO_PATH}/mesh/demo/Columns.tsx)

### 正方形格子

设置 `square` 属性后，格子的高度会和宽度保持一致。

%(${DEMO_PATH}/mesh/demo/Square.tsx)

### 格子间距

通过 `gap` 属性设置格子之间的距离。

%(${DEMO_PATH}/mesh/demo/Gap.tsx)

### 内容横排

将 `direction` 属性设置为 `horizontal` 可以让宫格的内容呈横向排列。

%(${DEMO_PATH}/mesh/demo/Horizontal.tsx)

### 内容翻转

将文本和图标的位置调换。

%(${DEMO_PATH}/mesh/demo/Reverse.tsx)

### 可点击的

添加点击态。

%(${DEMO_PATH}/mesh/demo/Clickable.tsx)

### 自定义内容

通过 `children` 可以自定义格子展示的内容。

%(${DEMO_PATH}/mesh/demo/Custom.tsx)

## API

### MeshProps

| 属性            | 描述                                            | 类型                       | 默认值     |
| --------------- | ----------------------------------------------- | -------------------------- | ---------- |
| columns         | 列数                                            | number                     | 4          |
| outline         | 是否显示外边框，`border` 为真时此属性才有用     | boolean                    | false      |
| outlineVertical | 是否显示垂直外边框，`border` 为真时此属性才有用 | boolean                    | false      |
| gap             | 格子间距                                        | number \|string            | 0          |
| border          | 是否显示边框                                    | boolean                    | true       |
| square          | 是否将格子显示为正方形                          | boolean                    | false      |
| center          | 是否将格子内容居中显示                          | boolean                    | true       |
| clickable       | 格子是否可点击                                  | boolean                    | false      |
| reverse         | 是否调换图标和文本的位置                        | boolean                    | false      |
| direction       | 格子排列方向                                    | 'horizontal' \| 'vertical' | 'vertical' |

### MeshItemProps

| 属性         | 描述               | 类型                         | 默认值 |
| ------------ | ------------------ | ---------------------------- | ------ |
| text         | 文字               | React.ReactNode              | -      |
| iconProps    | 图标组件的 `Props` | IconProps                    | -      |
| onClick      | 格子点击时触发     | (event: ITouchEvent) => void | -      |
| wrapperStyle | `wrapper`的样式    | React.CSSProperties          | -      |
| wrapperClass | `wrapper`的类名    | string                       | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
