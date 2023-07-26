# ProgressBar 条形进度条

### 介绍

以横条的方式展示当前进度。

### 引入

```js
import { ProgressBar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<ProgressBar percent={50} />
```

### 粗细

```tsx
<ProgressBar percent={50} thickness="20px" />
```

### 颜色

```tsx
<ProgressBar percent={50} trackColor="fuchsia" color="orange" />
```

### 条纹进度条

```tsx
<ProgressBar
  percent={50}
  striped
  thickness="10px"
  style={{ marginBottom: 10 }}
/>
<ProgressBar percent={50} striped thickness="10px" animated />
```

### 插槽

```tsx
<ProgressBar percent={50} thickness="16px">
  50%
</ProgressBar>
```

## API

### ProgressBarProps

| 属性       | 描述               | 类型             | 默认值 |
| ---------- | ------------------ | ---------------- | ------ |
| children   | 用于放置进度信息   | React.ReactNode  | -      |
| percent    | 当前进度           | number           | 0      |
| color      | 进度条进度部分颜色 | string           | -      |
| trackColor | 进度条轨道颜色     | string           | -      |
| striped    | 是否显示条纹       | boolean          | false  |
| animated   | 是否开启条纹动画   | boolean          | false  |
| thickness  | 进度条粗细         | string \| number | -      |

## 主题定制

### CSS 变量

%{variables}
