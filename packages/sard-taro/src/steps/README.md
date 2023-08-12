# Steps 步骤条

### 介绍

引导用户按照流程完成任务的分步导航条。

### 引入

```js
import { Steps } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `current` 属性指定步骤的下标，小于这个下标的步骤状态为 `finish`，等于这个下标的步骤状态为 `process`，大于这个下标的步骤状态为 `wait`。

%(${DEMO_PATH}/steps/demo/Basic.tsx)

### 居中

%(${DEMO_PATH}/steps/demo/Center.tsx)

### 垂直步骤条

%(${DEMO_PATH}/steps/demo/Vertical.tsx)

### 垂直居中

%(${DEMO_PATH}/steps/demo/VerticalCenter.tsx)

### 自定义图标

%(${DEMO_PATH}/steps/demo/Icon.tsx)

### 当前步骤状态

可以设置当前处理中的步骤的状态为`finish`来模拟只有“未处理”和“已处理”两个状态的步骤条。

%(${DEMO_PATH}/steps/demo/Status.tsx)

### 错误步骤

可以设置当前处理中的步骤的状态为`error`表示步骤运行错误。

%(${DEMO_PATH}/steps/demo/ErrorStatus.tsx)

### 自定义各步骤状态

%(${DEMO_PATH}/steps/demo/StepStatus.tsx)

### 可点击的

设置 `clickable` 属性添加点击状态。

%(${DEMO_PATH}/steps/demo/Clickable.tsx)

### 禁用

%(${DEMO_PATH}/steps/demo/Disabled.tsx)

## API

### StepsProps

| 属性      | 描述                 | 类型                                                          | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------- | ------ |
| center    | 是否居中             | boolean                                                       | false  |
| vertical  | 是否垂直             | boolean                                                       | false  |
| current   | 当前步骤对应的索引值 | number                                                        | 0      |
| status    | 指定当前步骤的状态   | StepsStatus                                                   | -      |
| lineColor | 线条颜色             | string                                                        | -      |
| clickable | 是否可点击           | boolean                                                       | false  |
| disabled  | 是否禁用             | boolean                                                       | false  |
| icon      | 自定义图标           | React.ReactNode \| ((status: StepsStatus) => React.ReactNode) | -      |

### StepsStepProps

| 属性      | 描述       | 类型                                                          | 默认值 |
| --------- | ---------- | ------------------------------------------------------------- | ------ |
| status    | 自定义状态 | StepsStatus                                                   | -      |
| lineColor | 线条颜色   | string                                                        | -      |
| disabled  | 是否禁用   | boolean                                                       | false  |
| icon      | 自定义图标 | React.ReactNode \| ((status: StepsStatus) => React.ReactNode) | -      |
| onClick   | 点击时触发 | (event: ITouchEvent) => void                                  | -      |

### StepsStatus

```tsx
export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'
```

## 主题定制

### CSS 变量

%(./index.scss#variables)
