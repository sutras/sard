# Checkbox 复选框

### 介绍

在一组可选项中进行任意选择。

### 引入

```js
import { Checkbox } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Checkbox>复选框</Checkbox>
```

### 受控

```tsx
const [checked, setChecked] = useState(false)
```

```tsx
<Checkbox checked={checked} onChange={setChecked}>
  {checked ? '已选中' : '未选中'}
</Checkbox>
```

### 禁用

```tsx
<Checkbox disabled checked>复选框</Checkbox>
<Checkbox disabled>复选框</Checkbox>
```

### 复选框组

复选框组用于收集选中状态的复选框值。

```tsx
const [value, setValue] = useState(['apple'])
```

```tsx
<Checkbox.Group value={value} onChange={setValue}>
  <Checkbox value="apple">苹果</Checkbox>
  <Checkbox value="banana">香蕉</Checkbox>
</Checkbox.Group>
```

### 图标大小

```tsx
<Checkbox size="24px">复选框</Checkbox>
```

### 自定义颜色

```tsx
<Checkbox checkedColor="orange" defaultChecked>
  复选框
</Checkbox>
```

### 图标类型

```tsx
<Checkbox type="circle">复选框</Checkbox>
```

### 自定义图标

```tsx
<Checkbox
  icon={(checked) => (
    <Icon prefix="demo-icon" name={checked ? 'heart-fill' : 'heart'} />
  )}
>
  复选框
</Checkbox>
```

## API

### CheckboxProps

| 属性           | 描述                                             | 类型                                   | 默认值   |
| -------------- | ------------------------------------------------ | -------------------------------------- | -------- |
| children       | label 内容                                       | React.ReactNode                        | -        |
| checked        | 指定当前是否选中                                 | boolean                                | false    |
| defaultChecked | 默认是否选中                                     | boolean                                | false    |
| checkedColor   | 选中时图标的颜色                                 | string                                 | -        |
| disabled       | 禁用状态                                         | boolean                                | false    |
| icon           | 自定义图标                                       | (checked: boolean) => React.ReactNode  | -        |
| onClick        | 点击时触发                                       | onClick?: (event: ITouchEvent) => void | -        |
| onChange       | 变化时触发                                       | (checked: boolean, value: any) => void | -        |
| size           | 图标的尺寸                                       | string \| number                       | -        |
| type           | 图标类型                                         | 'square' \| 'circle'                   | 'square' |
| value          | 被 `CheckboxGroup` 的 `value` 包含时表示选中状态 | any                                    | -        |

### CheckboxGroupProps

| 属性         | 描述             | 类型                                  | 默认值   |
| ------------ | ---------------- | ------------------------------------- | -------- |
| value        | 指定选中的选项   | any[]                                 | []       |
| defaultValue | 默认选中的选项   | any[]                                 | []       |
| onChange     | 变化时触发       | (value: any[]) => void                | -        |
| disabled     | 禁用状态         | boolean                               | false    |
| checkedColor | 选中时图标的颜色 | string                                | -        |
| icon         | 自定义图标       | (checked: boolean) => React.ReactNode | -        |
| size         | 图标的尺寸       | string \| number                      | -        |
| type         | 图标类型         | 'square' \| 'circle'                  | 'square' |
| vertical     | 是否垂直排列     | boolean                               | false    |

## 主题定制

### CSS 变量

%{variables}
