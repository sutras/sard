# Stepper 步进器

### 介绍

通过键盘或按钮输入或改变数值。

### 引入

```ts
import { Stepper } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `value` 和 `onChange` 使其变为受控组件。

%(${DEMO_PATH}/stepper/demo/Basic.tsx)

### 最大最小值

使用 `min` 和 `max` 属性限制可以输入的最大最小值。

%(${DEMO_PATH}/stepper/demo/MinMax.tsx)

### 步长

使用 `step` 属性设置点击增加或减少按钮时变化的值。

%(${DEMO_PATH}/stepper/demo/Step.tsx)

### 精度

使用 `precision` 属性设置数值的精度，即保留的小数位数，底层通过 `toFixed` 实现，因此需要设置大于等于 0 的整数。

%(${DEMO_PATH}/stepper/demo/Precision.tsx)

### 只读和禁用

只读或禁用时无法输入。

%(${DEMO_PATH}/stepper/demo/DisabledReadOnly.tsx)

## API

### StepperProps

| 属性         | 描述                                  | 类型                             | 默认值                  |
| ------------ | ------------------------------------- | -------------------------------- | ----------------------- |
| value        | 当前输入值                            | number                           | string                  |
| defaultValue | 默认值                                | number                           | string                  |
| onChange     | 数值改变时触发                        | (value: number \| null) => void  | -                       |
| min          | 最小值                                | number                           | Number.MIN_SAFE_INTEGER |
| max          | 最大值                                | number                           | Number.MAX_SAFE_INTEGER |
| valueOnClear | 当输入框被清空时显示的值              | number \| null \| 'min' \| 'max' | null                    |
| step         | 点击按钮时增加或减少的数值            | number                           | -                       |
| precision    | 数值精度，即允许的小数位数            | number                           | -                       |
| inputStyle   | 输入框样式                            | CSSProperties                    | -                       |
| inputType    | 输入框类型                            | 'number' \| 'digit' \| 'text'    | 'number'                |
| placeholder  | 输入框占位符                          | string                           | -                       |
| disabled     | 禁用状态                              | boolean                          | false                   |
| readOnly     | 只读状态                              | boolean                          | false                   |
| press        | 是否可以通过长按增加/减少按钮改变数值 | boolean                          | true                    |
| pressTime    | 触发长按事件的时间，单位毫秒          | boolean                          | 350                     |
| interval     | 长按改变数值的时间间隔，单位毫秒      | number                           | 150                     |
| onBlur       | 输入框获取焦点时触发                  | (event: any) => void             | -                       |
| onFocus      | 输入框失去焦点时触发                  | (event: any) => void             | -                       |
| size         | 输入框和按钮尺寸                      | number                           | 36                      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
