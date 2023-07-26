# Tag 标签

### 介绍

用于分类或概括事物属性的标签。

### 引入

```js
import { Tag } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Tag>标签</Tag>
```

### 主题色

```tsx
<Tag theme="primary">primary</Tag>
<Tag theme="secondary">secondary</Tag>
<Tag theme="success">success</Tag>
<Tag theme="info">info</Tag>
<Tag theme="warning">warning</Tag>
<Tag theme="danger">danger</Tag>
```

### 镂空

```tsx
<Tag plain theme="primary">
  primary
</Tag>
<Tag plain theme="secondary">
  secondary
</Tag>
<Tag plain theme="success">
  success
</Tag>
<Tag plain theme="info">
  info
</Tag>
<Tag plain theme="warning">
  warning
</Tag>
<Tag plain theme="danger">
  danger
</Tag>
```

### 圆角

```tsx
<Tag round>标签</Tag>
```

### 标记样式（半圆角）

```tsx
<Tag mark>标签</Tag>
```

### 尺寸

```tsx
<Tag size="small">标签</Tag>
<Tag>标签</Tag>
<Tag size="large">标签</Tag>
```

### 自定义样式

```tsx
<Tag style={{ background: '#ffeed0', color: 'orange' }}>标签</Tag>
<Tag plain style={{ color: 'orange' }}>
  标签
</Tag>
```

### 可关闭的

```tsx
<Tag closable onClose={() => console.log('close')}>
  标签
</Tag>
```

## API

### TagProps

| 属性     | 描述               | 类型                                                                     | 默认值    |
| -------- | ------------------ | ------------------------------------------------------------------------ | --------- |
| theme    | 主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| round    | 圆角按标签         | boolean                                                                  | false     |
| plain    | 镂空标签           | boolean                                                                  | false     |
| mark     | 标记标签           | boolean                                                                  | false     |
| size     | 标签尺寸           | 'small' \| 'medium' \| 'large'                                           | 'medium'  |
| closable | 是否可关闭         | boolean                                                                  | false     |
| onClose  | 点击关闭按钮时触发 | () => void                                                               | -         |
| onClick  | 点击标签时触发     | (event: ITouchEvent) => void                                             | -         |

## 主题定制

### CSS 变量

%{variables}
