# Stepper 步进器

### 介绍

通过键盘或按钮输入或改变数值。

### 引入

```js
import { Stepper } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Stepper placeholder="数量" />
```

### 受控

```tsx
export default () => {
  const [count, setCount] = useState<number | string>()

  return <Stepper placeholder="数量" value={count} onChange={setCount} />
}
```

### 最大最小值

```tsx
<Stepper placeholder="数量" min={0} max={5} />
```

### 步长

```tsx
<Stepper placeholder="数量" step={5} />
```

### 精度

```tsx
<Stepper placeholder="数量" precision={2} />
```

### 禁用

```tsx
<Stepper placeholder="数量" defaultValue={5} disabled />
```

### 只读

```tsx
<Stepper placeholder="数量" defaultValue={5} readOnly />
```

## API

### StepperProps

| 属性         | 描述                             | 类型                              | 默认值                  |
| ------------ | -------------------------------- | --------------------------------- | ----------------------- |
| inputWidth   | 输入框宽度                       | number \| string                  | -                       |
| value        | 当前输入值                       | number                            | string                  |
| defaultValue | 默认值                           | number                            | string                  |
| min          | 最小值                           | number                            | Number.MIN_SAFE_INTEGER |
| max          | 最大值                           | number                            | Number.MAX_SAFE_INTEGER |
| valueOnClear | 当输入框被清空时显示的值         | number \| null \| 'min' \| 'max'  | null                    |
| step         | 每次改变步数，可以为小数         | number                            | -                       |
| precision    | 数值精度                         | number                            | -                       |
| inputType    | 输入框类型                       | 'number' \| 'digit'               | 'number'                |
| placeholder  | 输入框占位符                     | string                            | -                       |
| disabled     | 禁用状态                         | boolean                           | false                   |
| readOnly     | 只读状态                         | boolean                           | false                   |
| press        | 通过长按增加/减少按钮改变数值    | boolean                           | true                    |
| pressTime    | 触发长按事件的时间，单位毫秒     | boolean                           | 350                     |
| interval     | 长按改变数值的时间间隔，单位毫秒 | number                            | 150                     |
| onChange     | 数值改变时触发                   | (value: number \| null) => void   | -                       |
| onBlur       | 输入框获取焦点时触发             | (event: React.FocusEvent) => void | -                       |
| onFocus      | 输入框失去焦点时触发             | (event: React.FocusEvent) => void | -                       |

## 主题定制

### CSS 变量

%{variables}