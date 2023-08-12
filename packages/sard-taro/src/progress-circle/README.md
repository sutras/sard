# ProgressCircle 环形进度条

### 介绍

以环形的方式展示当前进度。

### 引入

```js
import { ProgressCircle } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/progress-circle/demo/Basic.tsx)

### 粗细

相对于当前圆环尺寸的百分比。

%(${DEMO_PATH}/progress-circle/demo/Thickness.tsx)

### 颜色

%(${DEMO_PATH}/progress-circle/demo/Color.tsx)

### 尺寸

%(${DEMO_PATH}/progress-circle/demo/Size.tsx)

## API

### ProgressCircleProps

| 属性       | 描述                                   | 类型             | 默认值 |
| ---------- | -------------------------------------- | ---------------- | ------ |
| children   | 用于放置进度信息                       | React.ReactNode  | -      |
| percent    | 当前进度                               | number           | 0      |
| color      | 进度条进度部分颜色                     | string           | -      |
| trackColor | 进度条轨道颜色                         | string           | -      |
| size       | 圆环尺寸                               | string \| number | -      |
| thickness  | 进度条粗细，相对于当前圆环尺寸的百分比 | string \| number | 4      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
