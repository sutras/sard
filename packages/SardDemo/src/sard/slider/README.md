# Slider 滑动器

### 介绍

选择给定范围的一个值和区间。

### 引入

```ts
import { Slider } from 'sard'
```

## 代码演示

### 基础使用

滑动器可以选择一个值或者范围。使用 `value` 和 `onChange` 属性使组件受控。

@code('${DEMO_PATH}/slider/demo/Basic.tsx')

### slider

使用 `range` 属性设置范围选择。

@code('${DEMO_PATH}/slider/demo/Range.tsx')

### 最大最小值

使用 `min` 和 `max` 属性限制可以选择的最大最小值。

@code('${DEMO_PATH}/slider/demo/MinMax.tsx')

### 步长

使用 `step` 属性限制只能选择指定数字的倍数。

@code('${DEMO_PATH}/slider/demo/Step.tsx')

### 自定义颜色

使用 `trackColor` 属性设置轨道颜色；使用 `pieceColor` 属性设置选中片段的颜色；使用 `thumbColor` 属性设置按钮的颜色。

@code('${DEMO_PATH}/slider/demo/Color.tsx')

### 自定义尺寸

使用 `trackSize` 属性设置轨道尺寸；使用 `thumbSize` 属性设置按钮的尺寸。

@code('${DEMO_PATH}/slider/demo/Size.tsx')

### 垂直

使用 `vertical` 属性垂直展示滑动器。

@code('${DEMO_PATH}/slider/demo/Vertical.tsx')

### 只读和禁用

只读和禁用状态下无法操作。

@code('${DEMO_PATH}/slider/demo/DisabledReadOnly.tsx')

### 自定义按钮插槽

按钮插槽可以用来显示当前进度。

@code('${DEMO_PATH}/slider/demo/Slot.tsx')

## API

### SliderProps

| 属性         | 描述                           | 类型                                         | 默认值 |
| ------------ | ------------------------------ | -------------------------------------------- | ------ |
| range        | 双滑块模式                     | boolean                                      | false  |
| value        | 滑动器值                       | number \| [number, number]                   | -      |
| defaultValue | 默认滑动器值                   | number \| [number, number]                   | -      |
| onChange     | 滑动器值改变时触发             | (value: number \| [number, number] ) => void | -      |
| onChangeEnd  | 在点击或滑动结束且值改变时触发 | (value: number \| [number, number] ) => void | -      |
| min          | 最小值                         | number                                       | 0      |
| max          | 最大值                         | number                                       | 100    |
| step         | 步长                           | number                                       | 1      |
| vertical     | 垂直方向滑动器                 | boolean                                      | false  |
| disabled     | 禁用状态                       | boolean                                      | false  |
| readOnly     | 只读状态                       | boolean                                      | false  |
| pieceColor   | 滑块间的轨道颜色               | string                                       | -      |
| trackColor   | 滑动器轨道颜色                 | string                                       | -      |
| trackSize    | 滑动器轨道尺寸                 | string \| number                             | -      |
| thumbColor   | 滑块颜色                       | string                                       | -      |
| thumbSize    | 滑块尺寸                       | string \| number                             | -      |
| startThumb   | 自定义开始滑块内容             | (value: number) => React.ReactNode           | -      |
| endThumb     | 自定义结束滑块内容             | (value: number) => React.ReactNode           | -      |
| thumb        | 自定义滑块内容                 | (value: number) => React.ReactNode           | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
