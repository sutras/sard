# Mesh 宫格

### 介绍

将多个类目进行等宽排列，用于内容展示或者页面导航。

### 引入

```js
import { Mesh } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Mesh>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 隐藏边框

```tsx
<Mesh border={false}>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 自定义列数

```tsx
<Mesh columns={3}>
  {Array(9)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 正方形格子

```tsx
<Mesh columns={3} square>
  {Array(6)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 格子间距

```tsx
<Mesh columns={4} gap="10px">
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 内容横排

```tsx
<Mesh direction="horizontal">
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 内容翻转

```tsx
<Mesh direction="horizontal" reverse>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

```tsx
<Mesh direction="vertical" reverse>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 可点击的

```tsx
<Mesh clickable>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item
        key={index}
        text="文字"
        iconProps={{ name: 'image' }}
      ></Mesh.Item>
    ))}
</Mesh>
```

### 自定义内容

```tsx
<Mesh>
  {Array(8)
    .fill(0)
    .map((_, index) => (
      <Mesh.Item key={index}>
        <Avatar>{index}</Avatar>
      </Mesh.Item>
    ))}
</Mesh>
```

## API

### RowProps

| 属性      | 描述                     | 类型                       | 默认值     |
| --------- | ------------------------ | -------------------------- | ---------- |
| columns   | 列数                     | number                     | 4          |
| gap       | 格子间距                 | number \|string            | 0          |
| border    | 是否显示边框             | boolean                    | true       |
| square    | 是否将格子显示为正方形   | boolean                    | false      |
| center    | 是否将格子内容居中显示   | boolean                    | true       |
| clickable | 格子是否可点击           | boolean                    | false      |
| direction | 格子排列方向             | 'horizontal' \| 'vertical' | 'vertical' |
| reverse   | 是否调换图标和文本的位置 | boolean                    | false      |

### ColProps

| 属性      | 描述               | 类型                         | 默认值 |
| --------- | ------------------ | ---------------------------- | ------ |
| text      | 文字               | React.ReactNode              | -      |
| iconProps | 图标组件的 `Props` | IconProps                    | -      |
| onClick   | 格子点击时触发     | (event: ITouchEvent) => void | -      |
| children  | 自定义格子内容     | React.ReactNode              | -      |

## 主题定制

### CSS 变量

%{variables}
