# Pressable 可按压的

### 介绍

检测子组件的按压情况，通常用于为子组件添加点击时状态。

### 引入

```ts
import { Pressable } from 'sard'
```

## 代码演示

### 基础使用

可以根据接收到的 `pressed` 状态添加类名或进行其他的操作。

@code('${DEMO_PATH}/pressable/demo/Basic.tsx')

### 禁用

禁用状态下 `pressed` 将始终为 `false`。

@code('${DEMO_PATH}/pressable/demo/Disabled.tsx')

## API

### PressableProps

| 属性          | 描述                                                                          | 类型                                                  | 默认值 |
| ------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| disabled      | 是否禁用按压检测                                                              | boolean                                               | false  |
| children      | 返回接收按压状态的子元素组件的函数                                            | ((state: { pressed: boolean }) => React.ReactElement) | -      |
| onTouchStart  | 返回的子元素在触发 `onTouchStart` 时调用，RN 端用 `GestureDetector` 模拟实现  | (event: any) => void                                  | -      |
| onTouchMove   | 返回的子元素在触发 `onTouchMove` 时调用，RN 端用 `GestureDetector` 模拟实现   | (event: any) => void                                  | -      |
| onTouchEnd    | 返回的子元素在触发 `onTouchEnd` 时调用，RN 端用 `GestureDetector` 模拟实现    | (event: any) => void                                  | -      |
| onTouchCancel | 返回的子元素在触发 `onTouchCancel` 时调用，RN 端用 `GestureDetector` 模拟实现 | (event: any) => void                                  | -      |
