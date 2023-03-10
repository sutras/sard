# Movable 可移动的视图

### 介绍

定义元素的拖拽逻辑。

### 引入

```js
import { Movable } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Large.tsx",
    "./demo/Direction.tsx",
    "./demo/LockDirection.tsx",
    "./demo/OutOfBounds.tsx",
    "./demo/Inertia.tsx",
    "./demo/Scale.tsx"
  ]
</script>

## API

### MovableArea 方法

| 名称           | 描述                 | 类型                          |
| -------------- | -------------------- | ----------------------------- |
| updateAreaRect | 更新可拖动区域的边界 | (rect?: BoundingRect) => void |

### MovableViewProps

| 属性            | 描述                                                        | 类型                                          | 默认值 |
| --------------- | ----------------------------------------------------------- | --------------------------------------------- | ------ |
| defaultX        | 默认 x 坐标                                                 | number                                        | 0      |
| defaultY        | 默认 y 坐标                                                 | number                                        | 0      |
| direction       | 允许滑动的方向                                              | 'all' \| 'vertical' \| 'horizontal' \| 'none' | 'all'  |
| inertia         | 是否允许惯性滑动                                            | boolean                                       | false  |
| maxSpeed        | 惯性滑动最大速度                                            | number                                        | 4      |
| inertiaDuration | 惯性滑动动画持续的时间，单位 ms                             | number                                        | 300    |
| inertiaTime     | 惯性滑动时间，会与速度相乘得到最终滑动的距离，单位 ms       | number                                        | 200    |
| outOfBounds     | 是否允许超出边界，超出后会回弹到边界                        | boolean                                       | false  |
| damping         | 超出边界的阻尼系数                                          | number                                        | 5      |
| reboundDuration | 回弹动画持续的时间                                          | number                                        | 200    |
| touchable       | 是否允许滑动                                                | boolean                                       | true   |
| lockDirection   | 是否锁定方向                                                | boolean                                       | false  |
| scale           | 是否允许缩放                                                | boolean                                       | false  |
| minScale        | 最小缩放倍数                                                | number                                        | 0.5    |
| maxScale        | 最大缩放倍数                                                | number                                        | 5      |
| onChange        | 发生位移或缩放时触发                                        | (x: number, y: number, scale: number) => void | -      |
| onWillChange    | 位移或缩放开始和结束时触发，用于设置 `css` 的 `will-change` | (willChange: 'auto' \| 'transform') => void   | -      |
| onPanStart      | 滑动开始时触发                                              | (event: StrikePanEvent) => void               | -      |
| onPanMove       | 滑动过程中触发                                              | (event: StrikePanEvent) => void               | -      |
| onPanEnd        | 滑动结束时触发                                              | (event: StrikePanEvent) => void               | -      |
| onMoveEnd       | 移动结束时触发，包括惯性或非惯性滑动                        | (x: number, y: number) => void                | -      |
| onPinchStart    | 缩放开始时触发                                              | (event: StrikePinchEvent) => void             | -      |
| onPinchMove     | 缩放过程中触发                                              | (event: StrikePinchEvent) => void             | -      |
| onPinchEnd      | 缩放结束时触发                                              | (event: StrikePinchEvent) => void             | -      |

### MovableView 方法

| 名称           | 描述                       | 类型                          |
| -------------- | -------------------------- | ----------------------------- |
| updateViewRect | 更新可拖动视图的位置和尺寸 | (rect?: BoundingRect) => void |

### BoundingRect

```ts
interface BoundingRect {
  x: number
  y: number
  width: number
  height: number
}
```

## 主题定制

### SCSS

```scss

```
