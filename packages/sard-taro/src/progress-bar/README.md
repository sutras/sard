# ProgressBar 条形进度条

### 介绍

以横条的方式展示当前进度。

### 引入

```js
import { ProgressBar } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/progress-bar/demo/Basic.tsx)

### 粗细

%(${DEMO_PATH}/progress-bar/demo/Thickness.tsx)

### 颜色

%(${DEMO_PATH}/progress-bar/demo/Color.tsx)

### 条纹进度条

%(${DEMO_PATH}/progress-bar/demo/Striped.tsx)

### 插槽

%(${DEMO_PATH}/progress-bar/demo/Slot.tsx)

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

%(./index.scss#variables)
