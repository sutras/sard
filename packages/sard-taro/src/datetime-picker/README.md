# DatetimePicker 日期时间选择器

### 介绍

用于选择日期时间。

### 引入

```js
import { DatetimePicker } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/datetime-picker/demo/Basic.tsx)

### 受控

%(${DEMO_PATH}/datetime-picker/demo/Controllable.tsx)

### 类型

可以使用 'yMdhms'（年月日时分秒）进行任意组合。

%(${DEMO_PATH}/datetime-picker/demo/Type.tsx)

### 最大最小值

%(${DEMO_PATH}/datetime-picker/demo/MinMax.tsx)

### 过滤器

%(${DEMO_PATH}/datetime-picker/demo/Filter.tsx)

### 格式化

%(${DEMO_PATH}/datetime-picker/demo/Formatter.tsx)

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

%(./index.scss#variables)
