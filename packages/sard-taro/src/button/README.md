# Button 按钮

### 介绍

按钮用于开始一个即时操作。

### 引入

```js
import { Button } from 'sard-taro'
```

## 代码演示

### 基础按钮

```tsx
<Button>基础按钮</Button>
```

### 按钮类型

```tsx
<Button type="default">默认</Button>
<Button type="pale">淡颜色</Button>
<Button type="mild">温和</Button>
<Button type="outline">轮廓线</Button>
<Button type="text">文本</Button>
<Button type="pale-text">淡文本</Button>
```

### 按钮颜色

```tsx
<Button theme="primary">primary</Button>
<Button theme="secondary">secondary</Button>
<Button theme="success">success</Button>
<Button theme="info">info</Button>
<Button theme="warning">warning</Button>
<Button theme="danger">danger</Button>
```

### 自定义颜色

```tsx
<Button style={{ background: 'fuchsia' }}>default</Button>
<Button
  style={{ background: 'rgba(255, 0, 255, 0.2)', color: 'fuchsia' }}
  type="pale"
>
  pale
</Button>
<Button style={{ color: 'fuchsia' }} type="mild">
  mild
</Button>
<Button style={{ color: 'fuchsia' }} type="outline">
  outline
</Button>
<Button style={{ color: 'fuchsia' }} type="text">
  text
</Button>
<Button style={{ color: 'fuchsia' }} type="pale-text">
  pale-text
</Button>
<Button
  style={{ background: 'linear-gradient(to right, orange, fuchsia)' }}
>
  渐变色
</Button>
```

### 圆形按钮

```tsx
<Button round>default</Button>
<Button round type="pale">
  pale
</Button>
<Button round type="mild">
  mild
</Button>
<Button round type="outline">
  outline
</Button>
<Button round type="text">
  text
</Button>
<Button round type="pale-text">
  pale-text
</Button>
```

### 禁用按钮

```tsx
<Button disabled>default</Button>
<Button disabled type="pale">
  pale
</Button>
<Button disabled type="mild">
  mild
</Button>
<Button disabled type="outline">
  outline
</Button>
<Button disabled type="text">
  text
</Button>
<Button disabled type="pale-text">
  pale-text
</Button>
```

### 块级按钮

```tsx
<Button block>按钮</Button>
```

### 按钮尺寸

```tsx
<Button size="small">小尺寸</Button>
<Button>默认尺寸</Button>
<Button size="large">大尺寸</Button>
```

### 加载中

```tsx
<Button loading>primary</Button>
<Button loading loadingText="加载中">
  primary
</Button>
<Button loading loadingText="加载中" loadingProps={{ type: 'clock' }}>
  primary
</Button>
```

## API

### ButtonProps

| 属性         | 描述                   | 类型                                                                     | 默认值    |
| ------------ | ---------------------- | ------------------------------------------------------------------------ | --------- |
| type         | 按钮类型               | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default' |
| theme        | 按钮主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| size         | 按钮尺寸               | 'medium' \| 'small' \| 'large'                                           | 'medium'  |
| round        | 圆角按钮               | boolean                                                                  | false     |
| block        | 块级按钮               | boolean                                                                  | false     |
| disabled     | 禁用按钮               | boolean                                                                  | false     |
| loading      | 加载中状态             | boolean                                                                  | false     |
| loadingText  | 加载文本               | React.ReactNode                                                          | -         |
| loadingProps | `Loading` 组件 `props` | LoadingProps                                                             | -         |

## 主题定制

### CSS 变量

%{variables}
