# Calendar 日历

### 介绍

以日历的方式展示日期，可以进行单选、多选、范围选择等操作。

### 引入

```ts
import { Calendar } from 'sard'
```

## 代码演示

### 基础使用

日期组件通常配合 `PopoutInput` 组件一起使用，可以控制弹出框的显隐以及格式化输出当前值。

@code('${DEMO_PATH}/calendar/demo/Basic.tsx')

### 类型

日历组件可以选择单个值、多个值以及进行范围选择。

@code('${DEMO_PATH}/calendar/demo/Type.tsx')

### 自定义日期范围

可以使用 `min` 和 `max` 属性限制可以选择的日期的范围。

@code('${DEMO_PATH}/calendar/demo/MinMax.tsx')

### 最多选择天数

在多个值和范围选择中，使用 `maxDays` 属性可以限制最多可选的天数。
超出允许选择的天数后会调用 `overMaxDays` 属性配置的函数。

@code('${DEMO_PATH}/calendar/demo/MaxDays.tsx')

### 禁用日期

`disabledDate` 属性配置的函数接收一个日期对象，如果此函数返回真则禁用这个日期。

@code('${DEMO_PATH}/calendar/demo/DisabledDate.tsx')

### 自定义起始周

默认一周从星期天开始，使用 `weekStartsOn` 属性可以配置一周从任意星期开始。
0 表示从周日开始，1 表示从周一开始。

@code('${DEMO_PATH}/calendar/demo/WeekStartsOn.tsx')

### 格式化日期

`formatter` 属性可以配置一个接收 `CalendarDay` 类型的对象，通过此对象可以自定义当前日期展示的内容和样式。

@code('${DEMO_PATH}/calendar/demo/Formatter.tsx')

## API

### CalendarProps

| 属性               | 描述                                                                                       | 类型                                                           | 默认值                  |
| ------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------- |
| type               | 日历类型                                                                                   | CalendarType                                                   | 'single'                |
| value              | 选中的日期，单选时为当个日期，多选时为日期数组，范围时为两个日期数组                       | Date \| Date[]                                                 | -                       |
| defaultValue       | 默认选中的日期                                                                             | Date \| Date[]                                                 | -                       |
| onChange           | 选择的日期改变时触发                                                                       | (value: Date \| Date[]) => void                                | -                       |
| min                | 可选择的最小日期                                                                           | Date                                                           | 前十年                  |
| max                | 可选择的最大日期                                                                           | Date                                                           | 后十年                  |
| defaultCurrentDate | 当前展示月份的日期                                                                         | Date                                                           | -                       |
| disabledDate       | 指定禁选日期，返回 `true` 表示禁选                                                         | (date: Date) => boolean                                        | -                       |
| maxDays            | 最多可选天数，用于多选和范围                                                               | number                                                         | Number.MAX_SAFE_INTEGER |
| overMaxDays        | 超出最多可选天数时触发                                                                     | () => void                                                     | -                       |
| weekStartsOn       | 指定一周以周几开始，`0` 表示周日，`1-6` 分别表示周一至周六                                 | number                                                         | 0                       |
| formatter          | 通过修改 `CalendarDay` 对象属性值，来自定义日期的文案和样式                                | (day: CalendarDay) => void                                     | -                       |
| allowSameDay       | 范围选择中，是否允许起始和结束为同一天                                                     | boolean                                                        | false                   |
| withPopout         | 是否配合弹出框一起使用。组件内部仅把要渲染的元素放在弹出框可在弹出框隐藏时保留组件的状态。 | boolean                                                        | false                   |
| popoutProps        | `Popout` 组件的 `props`                                                                    | PopoutProps                                                    | -                       |
| outletFormatter    | 配合 `PopoutInput` 使用时自定义格式化输出要展示的数据                                      | (type: CalendarType, value?: Date \| Date[] \| null) => string | -                       |

### CalendarType

```ts
type CalendarType = 'single' | 'multiple' | 'range'
```

### CalendarDay

| 属性      | 描述                             | 类型                                                                           |
| --------- | -------------------------------- | ------------------------------------------------------------------------------ |
| date      | 当前月份中每日对应的日期对象     | Date                                                                           |
| type      | 日期类型，每个类型对应的含义如下 | 'same' \| 'start' \| 'middle' \| 'end' \| 'disabled' \| 'selected' \| 'normal' |
| top       | 额外的上方信息                   | React.ReactNode                                                                |
| text      | 中间显示的文字                   | React.ReactNode                                                                |
| bottom    | 额外的下方信息                   | React.ReactNode                                                                |
| className | 类名                             | string                                                                         |
| style     | 样式                             | React.CSSProperties                                                            |

### CalendarDay['type']

| 类型     | 描述                         |
| -------- | ---------------------------- |
| same     | 表示起始和结束日期位于同一天 |
| start    | 表示起始日期                 |
| middle   | 表示位于起始和结束日期之间   |
| end      | 表示结束日期                 |
| disabled | 被禁用的日期                 |
| selected | 单选或多选时选中的日期       |
| normal   | 正常状态日期                 |

### Calendar 类方法

| 方法                   | 描述                                                        | 类型                                                                          |
| ---------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| outletFormatter        | 根据 `props` 和当前值获取要展示的预备数据，并将其格式化输出 | (props: CalendarProps, value?: Date \| Date[] \| null \| undefined) => string |
| defaultOutletFormatter | 默认的格式化要展示的预备数据的函数                          | (labels: (string \| number)[]) => string                                      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
