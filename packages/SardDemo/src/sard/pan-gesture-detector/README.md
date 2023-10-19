# PanGestureDetector 滑动手势检测器

### 介绍

兼容 H5、小程序、RN 的滑动手势的简单封装。

### 引入

```ts
import { PanGestureDetector } from 'sard'
```

## 代码演示

## API

### PanGestureDetector

| 属性     | 描述                | 类型         | 默认值 |
| -------- | ------------------- | ------------ | ------ |
| children | 只能为 `React` 元素 | ReactElement | -      |
| handlers | 事件句柄            | Handlers     | -      |

### Handlers

| 属性          | 描述                | 类型                                |
| ------------- | ------------------- | ----------------------------------- |
| onMouseDown   | 只能为 `React` 元素 | ((event: any) => void) \| undefined |
| onTouchStart  | 滑动开始时触发      | PanHandler                          |
| onTouchMove   | 滑动过程中触发      | PanHandler                          |
| onTouchEnd    | 滑动结束时触发      | PanHandler                          |
| onTouchCancel | 滑动取消时触发      | PanHandler                          |

### PanHandler

```tsx
interface PanHandler {
  (event: any): void
}
```

### usePan

```tsx
function usePan(options: UsePanOptions): Handlers
```

#### UsePanOptions

| 属性  | 描述           | 类型        |
| ----- | -------------- | ----------- |
| start | 触摸开始时触发 | PanCallback |
| move  | 触摸移动时触发 | PanCallback |
| end   | 触摸结束时触发 | PanCallback |

#### PanCallback

```tsx
interface PanCallback {
  (event: PanEvent): void
}
```

#### PanEvent

| 属性      | 描述                            | 类型   |
| --------- | ------------------------------- | ------ |
| x0        | 触摸开始时的 x 坐标，相对于视图 | number |
| y0        | 触摸开始时的 y 坐标，相对于视图 | number |
| moveX     | 移动过程中的 x 坐标，相对于视图 | number |
| moveY     | 移动过程中的 y 坐标，相对于视图 | number |
| dx        | 距离触摸开始时的 x 坐标的距离   | number |
| dy        | 距离触摸开始时的 y 坐标的距离   | number |
| vx        | x 轴方向手势的当前速度          | number |
| vy        | y 轴方向手势的当前速度          | number |
| offsetX   | dx 的绝对值                     | number |
| offsetY   | dy 的绝对值                     | number |
| axis      | 滑动后初次识别的轴线            | number |
| timestamp | 触发当前手势的时间戳            | number |
