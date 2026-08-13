---
title: DateStrip
subtitle: 日期横条
group: 表单组件
---

## 介绍

以横条的方式展示范围内的日期，可以进行单选、多选、范围选择等操作。

## 代码演示

### 基础用法

使用 `v-model` 绑定当前值。

<<< @demo/date-strip/demo/Basic.vue

### 类型

日期横条可以选择单个值、多个值以及进行范围选择。

<<< @demo/date-strip/demo/Type.vue

### 自定义日期范围

可以使用 `min` 和 `max` 属性限制可以选择的日期范围。

<<< @demo/date-strip/demo/MinMax.vue

### 最多选择天数

在多个值和范围选择中，使用 `maxDays` 属性可以限制最多可选的天数。超出允许选择的天数后会调用 `overMaxDays` 属性配置的函数。

<<< @demo/date-strip/demo/MaxDays.vue

### 禁用日期

`disabledDate` 属性配置的函数接收一个日期对象，如果此函数返回真则禁用这个日期。

<<< @demo/date-strip/demo/DisabledDate.vue

### 过滤日期

`filter` 属性配置的函数可以过滤要展示的日期。

<<< @demo/date-strip/demo/FilterDate.vue

### 格式化日期

`formatter` 属性可以配置一个接收 `CalendarDay` 类型对象的函数，通过此对象可以自定义当前日期展示的内容和样式。

<<< @demo/date-strip/demo/Formatter.vue

### 展示农历

可以设置 `show-lunar` 属性显示农历信息。

<<< @demo/date-strip/demo/ShowLunar.vue

### 自定义样式

可以设置 css 变量来改变默认样式。

<<< @demo/date-strip/demo/Style.vue

## API

### DateStripProps

| 属性            | 描述                                                    | 类型                                                      | 默认值                  |
| --------------- | ------------------------------------------------------- | --------------------------------------------------------- | ----------------------- |
| type            | 日期横条类型                                            | CalendarType                                              | 'single'                |
| model-value     | 选中的日期，单选时为单个日期，多选和范围时为日期数组    | Date \| Date[] \| string \| string[]                      | -                       |
| min             | 可选择的最小日期                                        | Date                                                      | 前七天                  |
| max             | 可选择的最大日期                                        | Date                                                      | 后七天                  |
| current-date    | 当前日期                                                | Date                                                      | new Date()              |
| disabled-date   | 指定禁选日期，返回 `true` 表示禁选                      | `(date: Date) => boolean`                                 | -                       |
| filter          | 只展示通过过滤的日期                                    | `(date: Date) => boolean`                                 | -                       |
| max-days        | 最多可选天数，用于多选和范围                            | number                                                    | Number.MAX_SAFE_INTEGER |
| over-max-days   | 超出最多可选天数时触发                                  | `() => void`                                              | -                       |
| formatter       | 通过修改 `CalendarDay` 对象属性值，自定义日期文案和样式 | `(day: CalendarDay) => void`                              | -                       |
| allow-same-day  | 范围选择中，是否允许起始和结束为同一天                  | boolean                                                   | false                   |
| value-format    | 绑定值的格式，不指定则绑定值为 Date 对象                | string [详见特殊符号](../utilities/date#日期格式特殊符号) | -                       |
| start-date-text | 开始日期文字                                            | string                                                    | '开始'                  |
| end-date-text   | 结束日期文字                                            | string                                                    | '结束'                  |
| same-date-text  | 选择同一天日期文字                                      | string                                                    | '开始/结束'             |
| show-lunar      | 是否显示农历信息                                        | boolean                                                   | false                   |

### DateStripEmits

| 事件              | 描述                     | 类型                                                    |
| ----------------- | ------------------------ | ------------------------------------------------------- |
| update:modelValue | 点击并选中任意日期时触发 | `(value: Date \| Date[] \| string \| string[]) => void` |
| change            | 点击并选中任意日期时触发 | `(value: Date \| Date[] \| string \| string[]) => void` |

### CalendarType

```ts
type CalendarType = 'single' | 'multiple' | 'range'
```

### CalendarDay

与 [Calendar 组件](./calendar#CalendarDay) 中的 `CalendarDay` 一致。

## 主题定制

### 样式变量

| CSS 变量                             | 值                                      |
| ------------------------------------ | --------------------------------------- |
| `--s-date-strip-column-gap`          | `8px`                                   |
| `--s-date-strip-item-width`          | `64px`                                  |
| `--s-date-strip-item-padding-y`      | `9px`                                   |
| `--s-date-strip-item-padding-x`      | `6px`                                   |
| `--s-date-strip-item-radius`         | `var(--s-border-radius)`                |
| `--s-date-strip-item-border-color`   | `transparent`                           |
| `--s-date-strip-item-bg`             | `transparent`                           |
| `--s-date-strip-item-week-font-size` | `var(--s-font-size-sm)`                 |
| `--s-date-strip-item-week-color`     | `var(--s-text-color-secondary)`         |
| `--s-date-strip-item-week-order`     | `1`                                     |
| `--s-date-strip-item-day-font-size`  | `var(--s-font-size)`                    |
| `--s-date-strip-item-day-color`      | `inherit`                               |
| `--s-date-strip-item-day-order`      | `2`                                     |
| `--s-date-strip-item-info-font-size` | `var(--s-font-size-xs)`                 |
| `--s-date-strip-item-info-color`     | `var(--s-text-color-tertiary)`          |
| `--s-date-strip-item-info-order`     | `3`                                     |
| `--s-date-strip-item-color-selected` | `var(--s-white)`                        |
| `--s-date-strip-item-bg-selected`    | `var(--s-color-primary)`                |
| `--s-date-strip-item-bg-middle`      | `rgba(var(--s-color-primary-rgb), 0.1)` |
| `--s-date-strip-item-color-today`    | `var(--s-color-primary)`                |
