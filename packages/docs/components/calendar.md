---
title: Calendar
subtitle: 日历
group:
  title: 表单组件
  order: 2
---

## 介绍

以日历的方式展示日期，可以进行单选、多选、范围选择等操作。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值。

<<< @demo/calendar/demo/Basic.vue

更多案例，请参考 [CalendarPopout 组件](./calendar-popout)。

## API

### CalendarProps

| 属性            | 描述                                                                 | 类型                                                      | 默认值                                          |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| type            | 日历类型                                                             | CalendarType                                              | 'single'                                        |
| model-value     | 选中的日期，单选时为当个日期，多选时为日期数组，范围时为两个日期数组 | Date \| Date[] \| string \| string[]                      | -                                               |
| min             | 可选择的最小日期                                                     | Date                                                      | 前十年，或者当前月（设置了 `several-months`）   |
| max             | 可选择的最大日期                                                     | Date                                                      | 后十年，或者三个月后（设置了 `several-months`） |
| current-date    | 当前展示月份的日期                                                   | Date                                                      | -                                               |
| disabled-date   | 指定禁选日期，返回 `true` 表示禁选                                   | `(date: Date) => boolean`                                 | -                                               |
| max-days        | 最多可选天数，用于多选和范围                                         | number                                                    | Number.MAX_SAFE_INTEGER                         |
| over-max-days   | 超出最多可选天数时触发                                               | `() => void`                                              | -                                               |
| week-starts-on  | 指定一周以周几开始，`0` 表示周日，`1-6` 分别表示周一至周六           | number                                                    | 0                                               |
| formatter       | 通过修改 `CalendarDay` 对象属性值，来自定义日期的文案和样式          | `(day: CalendarDay) => void`                              | -                                               |
| allow-same-day  | 范围选择中，是否允许起始和结束为同一天                               | boolean                                                   | false                                           |
| several-months  | 是否显示多个月                                                       | boolean                                                   | false                                           |
| value-format    | 绑定值的格式，不指定则绑定值为 Date 对象                             | string [详见特殊符号](../utilities/date#日期格式特殊符号) | -                                               |
| start-date-text | 开始日期文字                                                         | string                                                    | '开始'                                          |
| end-date-text   | 结束日期文字                                                         | string                                                    | '结束'                                          |
| same-date-text  | 选择同一天日期文字                                                   | string                                                    | '开始/结束'                                     |

### CalendarEmits

| 事件              | 描述                     | 类型                                                    |
| ----------------- | ------------------------ | ------------------------------------------------------- |
| update:modelValue | 点击并选中任意日期时触发 | `(value: Date \| Date[] \| string \| string[]) => void` |
| change            | 点击并选中任意日期时触发 | `(value: Date \| Date[] \| string \| string[]) => void` |

### CalendarType

```ts
type CalendarType = 'single' | 'multiple' | 'range'
```

### CalendarDay

| 属性      | 描述                             | 类型                                                             |
| --------- | -------------------------------- | ---------------------------------------------------------------- |
| date      | 当前月份中每日对应的日期对象     | Date                                                             |
| disabled  | 是否禁用                         | boolean                                                          |
| type      | 日期类型，每个类型对应的含义如下 | 'same' \| 'start' \| 'middle' \| 'end' \| 'selected' \| 'normal' |
| today     | 是否为当天                       | boolean                                                          |
| top       | 额外的上方信息                   | string                                                           |
| text      | 中间显示的文字                   | string \| number                                                 |
| bottom    | 额外的下方信息                   | string                                                           |
| className | 类名                             | string                                                           |
| style     | 样式                             | StyleValue                                                       |

### CalendarDay['type']

| 类型     | 描述                         |
| -------- | ---------------------------- |
| same     | 表示起始和结束日期位于同一天 |
| start    | 表示起始日期                 |
| middle   | 表示位于起始和结束日期之间   |
| end      | 表示结束日期                 |
| selected | 单选或多选时选中的日期       |
| normal   | 正常状态日期                 |

## 主题定制

### 样式变量

| CSS 变量                               | 值                                                            |
| -------------------------------------- | ------------------------------------------------------------- |
| `--s-calendar-week-item-height`        | `var(--s-size-2xl)`                                           |
| `--s-calendar-week-item-font-size`     | `var(--s-font-size)`                                          |
| `--s-calendar-week-item-color`         | `var(--s-text-color-primary)`                                 |
| `--s-calendar-month-padding`           | `var(--s-size-2xs)`                                           |
| `--s-calendar-month-title-height`      | `var(--s-content-height)`                                     |
| `--s-calendar-month-title-font-size`   | `var(--s-font-size)`                                          |
| `--s-calendar-month-title-font-weight` | `var(--s-font-weight-bold)`                                   |
| `--s-calendar-month-title-color`       | `var(--s-text-color-primary)`                                 |
| `--s-calendar-days-row-gap`            | `var(--s-size-2xs)`                                           |
| `--s-calendar-days-column-gap`         | `0`                                                           |
| `--s-calendar-day-height`              | `50px`                                                        |
| `--s-calendar-day-font-size`           | `var(--s-font-size)`                                          |
| `--s-calendar-day-border-radius`       | `var(--s-border-radius)`                                      |
| `--s-calendar-day-color-selected`      | `var(--s-white)`                                              |
| `--s-calendar-day-color-middle`        | `var(--s-color-primary)`                                      |
| `--s-calendar-day-color-disabled`      | `var(--s-color-disabled)`                                     |
| `--s-calendar-day-bg-selected`         | `var(--s-color-primary)`                                      |
| `--s-calendar-day-bg-middle`           | `rgba(var(--s-color-primary-rgb), var(--s-opacity-theme-bg))` |
| `--s-calendar-day-top-top`             | `var(--s-size-2xs)`                                           |
| `--s-calendar-day-top-font-size`       | `var(--s-font-size-xs)`                                       |
| `--s-calendar-day-top-line-height`     | `var(--s-line-height-tight)`                                  |
| `--s-calendar-day-bottom-bottom`       | `var(--s-size-2xs)`                                           |
| `--s-calendar-day-bottom-font-size`    | `var(--s-font-size-xs)`                                       |
| `--s-calendar-day-bottom-line-height`  | `var(--s-line-height-tight)`                                  |
| `--s-calendar-mark-font-size`          | `160px`                                                       |
| `--s-calendar-mark-color`              | `var(--s-fill-color-fourth)`                                  |
