---
title: Slider
subtitle: 滑块
group: 表单组件
---

## 介绍

选择给定范围的一个值和区间。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值。

<<< @demo/slider/demo/Basic.vue

### 范围选择

使用 `range` 属性设置成范围选择。

<<< @demo/slider/demo/Range.vue

### 显示值

设置 `show-value` 属性会在滑块上方显示当前滑块对应的值。

<<< @demo/slider/demo/ShowValue.vue

### 最大最小值

使用 `min` 和 `max` 属性限制可以选择的最大最小值。

<<< @demo/slider/demo/MinMax.vue

### 垂直

使用 `vertical` 属性垂直展示滑块。

<<< @demo/slider/demo/Vertical.vue

### 步长

使用 `step` 属性限制只能选择指定数字的倍数的值。

<<< @demo/slider/demo/Step.vue

### 显示刻度

设置 `show-scale` 属性可以显示步长对应的刻度，设置 `scale-position` 属性可以让刻度显示在各个方位。

<<< @demo/slider/demo/ShowScale.vue

### 自定义颜色

使用 `track-color` 属性设置轨道颜色；使用 `color` 属性设置选中填充的颜色；使用 `thumb-color` 属性设置按钮的颜色。

<<< @demo/slider/demo/Color.vue

### 自定义尺寸

使用 `track-size` 属性设置轨道尺寸；使用 `thumb-size` 属性设置滑块的尺寸。

<<< @demo/slider/demo/Size.vue

### 只读和禁用

只读和禁用状态下无法操作。

<<< @demo/slider/demo/DisabledReadOnly.vue

### 自定义滑块插槽

滑块插槽可以用于自定义滑块样式。

<<< @demo/slider/demo/Slot.vue

## API

### SliderProps

| 属性             | 描述             | 类型                                   | 默认值            |
| ---------------- | ---------------- | -------------------------------------- | ----------------- |
| range            | 双滑块模式       | boolean                                | false             |
| model-value      | 滑块值           | number \| number[]                     | -                 |
| min              | 最小值           | number                                 | 0                 |
| max              | 最大值           | number                                 | 100               |
| step             | 步长             | number                                 | 1                 |
| vertical         | 垂直方向滑块     | boolean                                | false             |
| disabled         | 禁用状态         | boolean                                | false             |
| readonly         | 只读状态         | boolean                                | false             |
| color            | 滑块间的填充颜色 | string                                 | -                 |
| track-color      | 滑块轨道颜色     | string                                 | -                 |
| track-size       | 滑块轨道尺寸     | string                                 | -                 |
| thumb-color      | 滑块颜色         | string                                 | -                 |
| thumb-size       | 滑块尺寸         | string                                 | -                 |
| show-value       | 是否显示值       | boolean                                | false             |
| value-position   | 值显示的位置     | 'top' \| 'right' \| 'bottom' \| 'left' | 'top' / 'right'   |
| value-background | 设置值的背景色   | string                                 | -                 |
| value-color      | 设置值的字体颜色 | string                                 | -                 |
| show-scale       | 是否显示刻度     | boolean                                | false             |
| scale-position   | 刻度显示的位置   | 'top' \| 'right' \| 'bottom' \| 'left' | 'bottom' / 'left' |
| validate-event   | 是否触发表单验证 | boolean                                | true              |

### SliderSlots

| 插槽        | 描述               | 属性                |
| ----------- | ------------------ | ------------------- |
| start-thumb | 自定义起始滑块内容 | `{ value: number }` |
| end-thumb   | 自定义结束滑块内容 | `{ value: number }` |

### SliderEmits

| 事件              | 描述                             | 类型                                  |
| ----------------- | -------------------------------- | ------------------------------------- |
| update:modelValue | 滑块值实时改变时触发             | `(value: number \| number[]) => void` |
| input             | 滑块值实时改变时触发             | `(value: number \| number[]) => void` |
| change            | 滑块点击或拖动结束且值改变时触发 | `(value: number \| number[]) => void` |
| drag-start        | 开始拖动时触发                   | `(event: TouchEvent) => void`         |
| drag-end          | 结束拖动时触发                   | `(event: TouchEvent) => void`         |

## 主题定制

### 样式变量

| CSS 变量                                | 值                                     |
| --------------------------------------- | -------------------------------------- |
| `--s-slider-vertical-height`            | `150px`                                |
| `--s-slider-padding`                    | `calc(var(--s-slider-thumb-size) / 2)` |
| `--s-slider-padding-x-show-scale`       | `34px`                                 |
| `--s-slider-padding-y-show-scale`       | `26px`                                 |
| `--s-slider-track-main-axis-size`       | `100%`                                 |
| `--s-slider-track-cross-axis-size`      | `4px`                                  |
| `--s-slider-track-bg`                   | `var(--s-fill-color-secondary)`        |
| `--s-slider-fill-bg`                    | `var(--s-color-primary)`               |
| `--s-slider-thumb-size`                 | `24px`                                 |
| `--s-slider-thumb-bg`                   | `var(--s-white)`                       |
| `--s-slider-thumb-box-shadow`           | `var(--s-box-shadow-tertiary)`         |
| `--s-slider-value-padding`              | `4px`                                  |
| `--s-slider-value-min-width`            | `20px`                                 |
| `--s-slider-value-min-width-horizontal` | `28px`                                 |
| `--s-slider-value-font-size`            | `var(--s-font-size-sm)`                |
| `--s-slider-value-color`                | `var(--s-white)`                       |
| `--s-slider-value-bg`                   | `var(--s-gray-800)`                    |
| `--s-slider-value-box-shadow`           | `var(--s-box-shadow-tertiary)`         |
| `--s-slider-value-arrow-size`           | `6px`                                  |
| `--s-slider-scale-size`                 | `8px`                                  |
| `--s-slider-scale-text-font-size`       | `var(--s-font-size-sm)`                |
| `--s-slider-scale-text-offset`          | `20px`                                 |
