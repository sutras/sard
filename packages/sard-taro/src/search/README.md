# Search 搜索

### 介绍

用于搜索场景的输入框组件。

### 引入

```js
import { Search } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Search placeholder="请输入关键词" />
```

### 搜索按钮

```tsx
<Search placeholder="请输入关键词" search="搜索" onSearch={Toast.show} />
```

### 取消按钮

```tsx
<Search
  placeholder="请输入关键词"
  cancel="取消"
  onCancel={() => Toast.show('取消')}
/>
```

### 形状

```tsx
<Search placeholder="请输入关键词" shape="round" />
```

### 对齐

```tsx
<Search placeholder="请输入关键词" align="center" />
```

### 背景色

```tsx
<Search
  placeholder="请输入关键词"
  background="var(--sar-danger)"
  inputBackground="#fff"
  shape="round"
/>
```

### 禁用

```tsx
<Search placeholder="请输入关键词" disabled />
```

### 只读

```tsx
<Search placeholder="请输入关键词" readOnly />
```

### 插槽

```tsx
<Search
  placeholder="请输入关键词"
  shape="round"
  prepend={
    <Icon
      prefix="demo-icon"
      name="upc-scan"
      style={{ marginLeft: 5, marginRight: 17 }}
    />
  }
  inputPrepend={
    <Icon name="caret-down-fill" color="var(--sar-gray-700)" size={14} />
  }
  inputAppend={<Icon prefix="demo-icon" name="camera" size={20} />}
/>
```

```tsx
<Search
  placeholder="请输入关键词"
  shape="round"
  prepend={<Icon name="left" size={18} style={{ marginRight: 12 }} />}
  append={
    <Icon
      prefix="demo-icon"
      name="list-task"
      size={20}
      style={{ marginLeft: 10 }}
    />
  }
/>
```

## API

### Props

## 主题定制

### CSS 变量

%{variables}
