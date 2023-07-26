# Slider 滑动器

### 介绍

选择给定范围的一个值和区间。

### 引入

```js
import { Slider } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Slider defaultValue={50} />
```

### 范围选择

```tsx
<Slider defaultValue={[0, 50]} range />
```

### 受控

```tsx
export default () => {
  const [value, setValue] = useState(50)

  return <Slider value={value} onChange={setValue} />
}
```

```tsx
<Slider range value={value} onChange={handleChange} />
```

### 最大最小值

```tsx
<Slider defaultValue={0} min={-50} max={50} />

<Slider range defaultValue={[0, 30]} min={-50} max={50} />
```

### 步长

```tsx
<Slider defaultValue={50} step={10} />

<Slider range defaultValue={[20, 80]} step={12.3} />
```

### 自定义颜色

```tsx
<Slider
  defaultValue={50}
  pieceColor="orange"
  trackColor="fuchsia"
  thumbColor="pink"
/>

<Slider
  range
  defaultValue={[20, 80]}
  pieceColor="orange"
  trackColor="fuchsia"
  thumbColor="pink"
/>
```

### 自定义尺寸

```tsx
<Slider defaultValue={50} thumbSize="15px" trackSize="5px" />
<Slider range defaultValue={[20, 80]} thumbSize="15px" trackSize="5px" />
```

### 垂直

```tsx
<View style={{ height: 200 }}>
  <Slider defaultValue={50} vertical />
  <Slider range defaultValue={[20, 80]} vertical />
</View>
```

### 禁用

```tsx
<Slider defaultValue={50} disabled />
```

### 只读

```tsx
<Slider defaultValue={50} readOnly />
```

### 自定义按钮插槽

```tsx
const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '30px',
  height: '20px',
  borderRadius: '4px',
  color: '#fff',
}
const startStyle = {
  ...buttonStyle,
  backgroundColor: 'orange',
}
const endStyle = {
  ...buttonStyle,
  backgroundColor: 'fuchsia',
}

const startButton = (value) => <View style={startStyle}>{value}</View>
const endButton = (value) => <View style={endStyle}>{value}</View>
```

```tsx
<Slider defaultValue={50} thumb={endButton} />
<Slider
  range
  defaultValue={[20, 80]}
  startThumb={startButton}
  endThumb={endButton}
/>
```

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

%{variables}
