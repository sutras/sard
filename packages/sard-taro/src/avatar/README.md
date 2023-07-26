# Avatar 头像

### 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

### 引入

```js
import { Avatar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Avatar />
```

### 形状

```tsx
<Avatar shape="square" />
```

### 图标大小

```tsx
<Avatar iconSize={24} />
```

### 头像尺寸

```tsx
<Avatar size={48} />
```

### 图片类型

```tsx
import pic1 from '@/static/pic1.jpg'
export default () => {
  return <Avatar src={pic1} />
}
```

### 自定义内容

```tsx
<Avatar>
  <Icon name="question"></Icon>
</Avatar>

<Avatar>字</Avatar>
```

### 自定义样式

```tsx
<Avatar style={{ background: 'orange', color: 'white' }} />
```

### 额外内容

```tsx
<View>
  <Avatar
    shape="square"
    extra={<Badge fixed value={5}></Badge>}
  ></Avatar>
</View>

<View style={{ marginTop: 20 }}>
  <Avatar
    extra={
      <Badge
        fixed
        value={5}
        style={{ top: '14.6447%', right: '14.6447%' }}
      ></Badge>
    }
  ></Avatar>
</View>
```

### 头像组

```tsx
<Avatar.Group>
  <Avatar>头</Avatar>
  <Avatar>像</Avatar>
  <Avatar>组</Avatar>
</Avatar.Group>
```

### 间距

```tsx
<Avatar.Group gap={-30}>
  <Avatar>头</Avatar>
  <Avatar>像</Avatar>
  <Avatar>组</Avatar>
</Avatar.Group>
```

### 方向

```tsx
<Avatar.Group direction="left">
  <Avatar>头</Avatar>
  <Avatar>像</Avatar>
  <Avatar>组</Avatar>
</Avatar.Group>
```

### 最大头像个数

```tsx
<Avatar.Group maxCount={4}>
  <Avatar>头</Avatar>
  <Avatar>像</Avatar>
  <Avatar>组</Avatar>
  <Avatar>R</Avatar>
  <Avatar>E</Avatar>
  <Avatar>S</Avatar>
  <Avatar>T</Avatar>
</Avatar.Group>
```

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

%{variables}
