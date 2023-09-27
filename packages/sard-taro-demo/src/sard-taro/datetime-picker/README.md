# DatetimePicker 日期时间选择器

### 介绍

用于选择日期时间。

### 引入

```ts
import { DatetimePicker } from 'sard-taro'
```

## 代码演示

### 基础使用

日期时间选择器通常配合 `PopoutInput` 组件一起使用，可以控制弹出框的显隐以及格式化输出当前值。

%(${DEMO_PATH}/datetime-picker/demo/Basic.tsx)

### 类型

可以使用 `yMdhms`（年月日时分秒）进行任意组合。

%(${DEMO_PATH}/datetime-picker/demo/Type.tsx)

### 自定义日期时间范围

可以使用 `min` 和 `max` 属性限制可以选择的日期时间的范围。

%(${DEMO_PATH}/datetime-picker/demo/MinMax.tsx)

### 过滤器

可以使用 `filter` 属性来仅展示想要的内容。

%(${DEMO_PATH}/datetime-picker/demo/Filter.tsx)

### 格式化

可以使用 `formatter` 属性格式化展示的内容。

%(${DEMO_PATH}/datetime-picker/demo/Formatter.tsx)

### 单独使用

除了配合 `PopoutInput` 组件一起使用外，也可以单独使用。

%(${DEMO_PATH}/datetime-picker/demo/Alone.tsx)

## API

### DatetimePickerProps

| 属性            | 描述                                                                                       | 类型                                                                                         | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------ |
| type            | 设置每一列要展示的数据类型，每个字母对应一列                                               | string                                                                                       | 'yMd'  |
| min             | 可选的最小日期                                                                             | Date                                                                                         | 十年前 |
| max             | 可选的最大日期                                                                             | Date                                                                                         | 十年后 |
| value           | 当前选中的日期                                                                             | Date                                                                                         | -      |
| defaultValue    | 默认选中的日期                                                                             | Date                                                                                         | -      |
| onChange        | 选择的日期改变时触发                                                                       | (value: Date) => void                                                                        | -      |
| filter          | 选项的过滤函数                                                                             | (letter: DatetimeLetter, value: number, date: Date, index: number) => boolean                | -      |
| formatter       | 选项的格式化函数                                                                           | (letter: DatetimeLetter, option: DatetimeColumnOption, date: Date, index: number) => boolean | -      |
| withPopout      | 是否配合弹出框一起使用。组件内部仅把要渲染的元素放在弹出框可在弹出框隐藏时保留组件的状态。 | boolean                                                                                      | false  |
| popoutProps     | `Popout` 组件的 `props`                                                                    | PopoutProps                                                                                  | -      |
| outletFormatter | 配合 `PopoutInput` 使用时自定义格式化输出要展示的数据                                      | (props: DatetimePickerProps, value?: Date) => string                                         | -      |

### DatetimeLetter

```ts
type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'
```

上面每个字母分别代表“年月日时分秒”。

### DatetimeColumnOption

| 属性     | 描述                                               | 类型                        |
| -------- | -------------------------------------------------- | --------------------------- |
| value    | 选项值                                             | number                      |
| label    | 展示的文本，默认中文会在值的后面加上“年月日时分秒” | string \| number \| boolean |
| zerofill | 填充前置 0 后的选项值字符串，可在格式化时使用      | string                      |

### DatetimePickerRef

| 属性             | 描述       | 类型       |
| ---------------- | ---------- | ---------- |
| getValueForcibly | 获取当前值 | () => Date |

### DatetimePicker 类方法

| 方法                   | 描述                                                        | 类型                                                 |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| outletFormatter        | 根据 `props` 和当前值获取要展示的预备数据，并将其格式化输出 | (props: DatetimePickerProps, value?: Date) => string |
| defaultOutletFormatter | 默认的格式化要展示的预备数据的函数                          | (type: string, date?: Date) => string                |
