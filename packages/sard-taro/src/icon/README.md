# Icon 图标

### 介绍

基于字体的图标集。

### 引入

```js
import { Icon } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Icon name="search" />
```

### 尺寸

```tsx
<Icon name="search" size="20px" />
```

### 颜色

```tsx
<Icon name="search" color="orange" />
```

### 图片类型图标

名称里面带有`/`字符会被当作图片处理。

```tsx
import pic1 from '@/static/pic1.jpg'

export default () => {
  return <Icon name={pic1} />
}
```

### 自定义图标

组件库内置有用于其他组件的必须的少量的图标，在实际的应用中，通常需要引入自定义的特定风格的图标库或第三方图标库。

自定义图标库：

```css
@font-face {
  font-family: 'custom-icon';
  src: url('...');
}

.custom-icon {
  font-family: 'custom-icon';
}

.custom-icon-smile:before {
  content: '\e79a';
}
```

使用自定义图标库：

```tsx
<Icon prefix="custom-icon" name="smile" />
```

### 内置图标

## API

### IconProps

| 属性   | 描述                                                     | 类型             | 默认值 |
| ------ | -------------------------------------------------------- | ---------------- | ------ |
| name   | 图标名称或图片链接，如果名称带有`/`，会被认为是图片图标  | string           | ''     |
| prefix | 类名前缀，会作为独立类名，并拼接上 `name` 形成另一个类名 | string           | 'sari' |
| size   | 图标大小                                                 | string \| number | -      |
| color  | 图标颜色                                                 | string           | -      |

## 主题定制

### CSS 变量

%{variables}
