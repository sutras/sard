# Radio 单选按钮

### 介绍

在一组可选项中进行单一选择。

### 引入

```js
import { Radio } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Radio.Group defaultValue="option1">
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 受控

```tsx
const [value, setValue] = useState('option1')
```

```tsx
<Radio.Group value={value} onChange={setValue}>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 禁用状态

```tsx
<Radio.Group defaultValue="option1" disabled>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 垂直

```tsx
<Radio.Group defaultValue="option1" vertical>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 图标大小

```tsx
<Radio.Group defaultValue="option1" size="2em">
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 颜色

```tsx
<Radio.Group defaultValue="option1" checkedColor="orange">
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 图标类型

```tsx
<Radio.Group defaultValue="option1" type="circle">
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>

<Radio.Group defaultValue="option1" type="square">
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

### 自定义图标

```tsx
<Radio.Group
  defaultValue="option1"
  icon={(checked) => (
    <Icon prefix="demo-icon" name={checked ? 'heart-fill' : 'heart'} />
  )}
>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
</Radio.Group>
```

## API

### RadioProps

| 属性           | 描述                                          | 类型                                   | 默认值   |
| -------------- | --------------------------------------------- | -------------------------------------- | -------- |
| checked        | 指定当前是否选中                              | boolean                                | false    |
| defaultChecked | 默认是否选中                                  | boolean                                | false    |
| onChange       | 变化时触发                                    | (checked: boolean, value: any) => void | -        |
| checkedColor   | 选中时图标的颜色                              | string                                 | -        |
| children       | label 内容                                    | React.ReactNode                        | -        |
| icon           | 自定义图标                                    | (checked: boolean) => React.ReactNode  | -        |
| onClick        | 点击时触发                                    | onClick?: (event: ITouchEvent) => void | -        |
| value          | 与 `RadioGroup` 的 `value` 相同时表示选中状态 | any                                    | -        |
| size           | 图标的尺寸                                    | string \| number                       | -        |
| type           | 图标类型                                      | 'record' \| 'check'                    | 'record' |
| disabled       | 禁用状态                                      | boolean                                | false    |

### RadioGroupProps

| 属性         | 描述             | 类型                                  | 默认值   |
| ------------ | ---------------- | ------------------------------------- | -------- |
| value        | 指定选中的选项   | any                                   | -        |
| defaultValue | 默认选中的选项   | any                                   | -        |
| onChange     | 变化时触发       | (value: any) => void                  | -        |
| checkedColor | 选中时图标的颜色 | string                                | -        |
| icon         | 自定义图标       | (checked: boolean) => React.ReactNode | -        |
| size         | 图标的尺寸       | string \| number                      | -        |
| type         | 图标类型         | 'record' \| 'check'                   | 'record' |
| vertical     | 是否垂直排列     | boolean                               | false    |
| disabled     | 禁用状态         | boolean                               | false    |

## 主题定制

### CSS 变量

%{variables}
