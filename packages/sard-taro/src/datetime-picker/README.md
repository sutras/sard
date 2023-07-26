# DatetimePicker 日期时间选择器

### 介绍

用于选择日期时间。

### 引入

```js
import { DatetimePicker } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<DatetimePicker />
```

### 受控

```tsx
const [value, setValue] = useState(new Date())
```

```tsx
<DatetimePicker value={value} onChange={setValue} type="yMd" />
```

### 类型

可以使用 'yMdhms'（年月日时分秒）进行任意组合。

```tsx
<DatetimePicker type="yMd" />
<DatetimePicker type="hms" />
<DatetimePicker type="dhm" />
```

### 最大最小值

```tsx
<DatetimePicker
  type="yMd"
  min={new Date(2021, 4, 13)}
  max={new Date(2023, 6, 8)}
/>

<DatetimePicker
  type="hms"
  min={new Date(0, 0, 1, 9, 0, 0)}
  max={new Date(0, 0, 1, 18, 30, 0)}
/>

<DatetimePicker
  type="dhm"
  min={new Date(0, 0, 1, 9, 45)}
  max={new Date(0, 0, 6, 12, 12)}
/>
```

### 过滤器

```tsx
const filter = (letter: DatetimeLetter, value: number) => {
  if (letter === 'm') {
    return value % 15 === 0
  }
  return true
}
```

```tsx
<DatetimePicker type="hm" filter={filter} />
```

### 格式化

```tsx
const formatter = (letter: DatetimeLetter, option: DatetimeColumnOption) => {
  if (letter === 'y') {
    return option.zerofill + '年'
  }
  if (letter === 'M') {
    return option.zerofill + '月'
  }
  if (letter === 'd') {
    return `${option.zerofill}日`
  }
}
```

```tsx
<DatetimePicker type="yMd" formatter={formatter} />
```

## API

### DatetimePickerProps

| 属性         | 描述                               | 类型                                                                                           | 默认值 |
| ------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| type         | 设置时间日期类型，每个字母对应一列 | string \| DatetimeLetter[]                                                                     | -      |
| min          | 可选的最小日期                     | Date                                                                                           | 十年前 |
| max          | 可选的最大日期                     | Date                                                                                           | 十年后 |
| value        | 当前选中的日期                     | Date                                                                                           | -      |
| defaultValue | 默认选中的日期                     | Date                                                                                           | -      |
| onChange     | 选择的日期改变时触发               | (value: Date) => void                                                                          | -      |
| filter       | 选项过滤函数                       | ( letter: DatetimeLetter, value: number, date: Date, index: number ) => boolean                | -      |
| formatter    | 选项格式化函数                     | ( letter: DatetimeLetter, option: DatetimeColumnOption, date: Date, index: number ) => boolean | -      |

### DatetimeLetter

```ts
type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'
```

上面每个字母分别代表“年月日时分秒”。

### DatetimeColumnOption

| 属性     | 描述                                          | 类型                        |
| -------- | --------------------------------------------- | --------------------------- |
| value    | 选项值                                        | number                      |
| label    | 展示的文本                                    | string \| number \| boolean |
| zerofill | 填充前置 0 后的选项值字符串，可在格式化时使用 | string                      |

## 主题定制

### CSS 变量

%{variables}
