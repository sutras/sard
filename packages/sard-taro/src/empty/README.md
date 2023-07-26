# Empty 空状态

### 介绍

空状态时的占位提示。

### 引入

```js
import { Empty } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Empty />
```

### 自定义描述信息

```tsx
<Empty description="自定义描述内容" />
```

### 自定义图标大小

```tsx
<Empty iconProps={{ size: 32 }} />
```

### 图片类型图标

```tsx
import empty from '@/static/empty.svg'

export default () => {
  return <Empty iconProps={{ name: empty }} />
}
```

### 额外内容

```tsx
<Empty>
  <Button>重新请求</Button>
</Empty>
```

## API

### EmptyProps

| 属性        | 描述                   | 类型            | 默认值     |
| ----------- | ---------------------- | --------------- | ---------- |
| children    | 放置额外内容           | React.ReactNode | -          |
| icon        | 自定义图标             | React.ReactNode | -          |
| iconProps   | 图标组件的 `iconProps` | IconProps       | -          |
| description | 描述信息               | React.ReactNode | '暂无数据' |

## 主题定制

### CSS 变量

%{variables}
