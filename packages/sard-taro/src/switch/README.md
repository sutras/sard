# Switch 开关

### 介绍

用于打开/关闭两种状态间的切换。

### 引入

```js
import { Switch } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Switch defaultChecked />
```

### 自定义尺寸

```tsx
<Switch size="20px" defaultChecked />
```

### 自定义颜色

```tsx
<Switch checkedColor="orange" uncheckedColor="fuchsia" defaultChecked />
```

### 不同状态的值

```tsx
export default () => {
  const [checked, setChecked] = useState(true)
  const [value, setValue] = useState('on')

  return (
    <Switch
      checked={checked}
      onChange={(checked, value) => (setChecked(checked), setValue(value))}
      checkedValue="on"
      uncheckedValue="off"
    />
    <View>{value}</View>
  )
}
```

### 禁用状态

```tsx
<Switch disabled />
<Switch defaultChecked disabled />
```

### 禁用状态

```tsx
<Switch readOnly />
<Switch defaultChecked readOnly />
```

### 加载状态

```tsx
<Switch loading />
<Switch defaultChecked loading />
```

### 异步控制

```tsx
export default () => {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChange = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setChecked(checked)
      setLoading(false)
    }, 500)
  }

  return <Switch checked={checked} loading={loading} onChange={handleChange} />
}
```

## API

### SwitchProps

| 属性           | 描述             | 类型                                                           | 默认值 |
| -------------- | ---------------- | -------------------------------------------------------------- | ------ |
| checked        | 指定当前是否开启 | boolean                                                        | -      |
| defaultChecked | 默认是否开启     | boolean                                                        | -      |
| disabled       | 禁用状态         | boolean                                                        | false  |
| readOnly       | 只读状态         | boolean                                                        | false  |
| loading        | 加载状态         | boolean                                                        | false  |
| size           | 开关大小         | string \| number                                               | -      |
| checkedColor   | 开启时的颜色     | string                                                         | -      |
| uncheckedColor | 关闭时的颜色     | string                                                         | -      |
| checkedValue   | 开启时的值       | boolean \| string \| number                                    | -      |
| uncheckedValue | 关闭时的值       | boolean \| string \| number                                    | -      |
| onChange       | 变化时触发       | (checked: boolean, value: boolean \| string \| number) => void | -      |
| onClick        | 点击时触发       | (event: ITouchEvent) => void                                   | -      |

## 主题定制

### CSS 变量

%{variables}
