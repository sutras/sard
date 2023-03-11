# DatetimePicker 日期时间选择器

### 介绍

用于选择日期时间。

### 引入

```js
import { DatetimePicker } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Type.tsx",
    "./demo/Minmax.tsx",
    "./demo/Filter.tsx",
    "./demo/Formatter.tsx"
  ]
</script>

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

### DatetimePicker 方法

| 属性            | 描述                   | 类型       |
| --------------- | ---------------------- | ---------- |
| pickImmediately | 停止惯性滚动并选定选项 | () => void |

## 主题定制

### CSS 变量

%{variables}
