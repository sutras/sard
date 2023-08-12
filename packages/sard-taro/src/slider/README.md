# Slider 滑动器

### 介绍

选择给定范围的一个值和区间。

### 引入

```js
import { Slider } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/slider/demo/Basic.tsx)

### 范围选择

%(${DEMO_PATH}/slider/demo/Range.tsx)

### 受控

%(${DEMO_PATH}/slider/demo/Controllable.tsx)

### 最大最小值

%(${DEMO_PATH}/slider/demo/MinMax.tsx)

### 步长

%(${DEMO_PATH}/slider/demo/Step.tsx)

### 自定义颜色

%(${DEMO_PATH}/slider/demo/Color.tsx)

### 自定义尺寸

%(${DEMO_PATH}/slider/demo/Size.tsx)

### 垂直

%(${DEMO_PATH}/slider/demo/Vertical.tsx)

### 只读和禁用

%(${DEMO_PATH}/slider/demo/DisabledReadOnly.tsx)

### 自定义按钮插槽

%(${DEMO_PATH}/slider/demo/Slot.tsx)

## API

### SliderProps

| 属性          | 描述                         | 类型                                         | 默认值 |
| ------------- | ---------------------------- | -------------------------------------------- | ------ |
| value         | 滑动器值                     | number \| [number, number]                   | -      |
| defaultValue  | 默认滑动器值                 | number \| [number, number]                   | -      |
| onChange      | 滑动器值改变时触发           | (value: number \| [number, number] ) => void | -      |
| onAfterChange | 滑动器值改变且滑动结束时触发 | (value: number \| [number, number] ) => void | -      |
| range         | 双滑块模式                   | boolean                                      | false  |
| min           | 最小值                       | number                                       | 0      |
| max           | 最大值                       | number                                       | 100    |
| step          | 步长                         | number                                       | 1      |
| vertical      | 垂直方向滑动器               | boolean                                      | false  |
| disabled      | 禁用状态                     | boolean                                      | false  |
| pieceColor    | 滑块间的轨道颜色             | string                                       | -      |
| trackColor    | 滑动器轨道颜色               | string                                       | -      |
| trackSize     | 滑动器轨道尺寸               | string \| number                             | -      |
| thumbColor    | 滑块颜色                     | string                                       | -      |
| thumbSize     | 滑块尺寸                     | string \| number                             | -      |
| startThumb    | 自定义开始滑块内容           | (value: number) => React.ReactNode           | -      |
| endThumb      | 自定义结束滑块内容           | (value: number) => React.ReactNode           | -      |
| thumb         | 自定义滑块内容               | (value: number) => React.ReactNode           | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
