# Stepper 步进器

### 介绍

通过键盘或按钮输入或改变数值。

### 引入

```js
import { Stepper } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/MinMax.tsx",
    "./demo/Step.tsx",
    "./demo/Precision.tsx",
    "./demo/Disabled.tsx",
    "./demo/ReadOnly.tsx"
  ]
</script>

## API

### StepperProps

| 属性         | 描述                          | 类型                              | 默认值                  |
| ------------ | ----------------------------- | --------------------------------- | ----------------------- |
| inputWidth   | 输入框宽度                    | number \| string                  | -                       |
| value        | 当前输入值                    | number                            | -                       |
| defaultValue | 默认值                        | number                            | -                       |
| min          | 最小值                        | number                            | Number.MIN_SAFE_INTEGER |
| max          | 最大值                        | number                            | Number.MAX_SAFE_INTEGER |
| step         | 每次改变步数，可以为小数      | number                            | -                       |
| precision    | 数值精度                      | number                            | -                       |
| placeholder  | 占位符                        | string                            | -                       |
| disabled     | 禁用状态                      | boolean                           | false                   |
| readOnly     | 只读状态                      | boolean                           | false                   |
| press        | 通过按压增加/减少按钮改变数值 | boolean                           | true                    |
| interval     | 按压改变数值的时间间隔        | number                            | 150                     |
| onChange     | 数值改变时触发                | (value: number) => void           | -                       |
| onBlur       | 输入框获取焦点时触发          | (event: React.FocusEvent) => void | -                       |
| onFocus      | 输入框失去焦点时触发          | (event: React.FocusEvent) => void | -                       |

## 主题定制

### CSS 变量

%{variables}
