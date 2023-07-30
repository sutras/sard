# Calendar 日历

### 介绍

以日历的方式展示日期，可以进行单选、多选、范围选择等操作。

### 引入

```js
import { Calendar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
const handleChange = (date: Date) => {
  Toast.show(date.toLocaleDateString())
}
```

```tsx
<Calendar onChange={handleChange} />
```

### 配合弹出框使用

```tsx
<Popout title="请选择日期">
  <Popout.Outlet>
    {({ value, setVisible }) => (
      <Cell
        linkable
        title="选择日期"
        value={value?.toLocaleDateString() || ''}
        onClick={() => setVisible(true)}
      ></Cell>
    )}
  </Popout.Outlet>
  <Popout.Target>
    <Calendar />
  </Popout.Target>
</Popout>
```

选择多个日期：

```tsx
<Calendar type="multiple" />
```

选择范围：

```tsx
<Calendar type="range" />
```

### 自定义日期范围

```tsx
<Calendar min={new Date(2000, 0, 15)} max={new Date(2000, 0, 30)} />
```

### 最多选择天数

选择多个日期：

```tsx
<Calendar
  type="multiple"
  maxDays={3}
  overMaxDays={() => Toast.show('最多选择3天')}
/>
```

选择范围：

```tsx
<Calendar
  type="range"
  maxDays={3}
  min={new Date(2000, 0, 15)}
  max={new Date(2000, 0, 20)}
  overMaxDays={() => Toast.show('最多选择3天')}
/>
```

### 禁用日期

```tsx
// 禁用周末
const disabledDate = (date: Date) => {
  return /0|6/.test(String(date.getDay()))
}
```

```tsx
<Calendar disabledDate={disabledDate} />
```

### 自定义颜色

```tsx
<Popout
  title="请选择日期"
  style={{
    '--sar-primary': 'var(--sar-danger)',
    '--sar-calendar-day-selected-bg': 'var(--sar-danger)',
    '--sar-calendar-day-today-color': 'var(--sar-danger)',
  }}
></Popout>
```

### 自定义起始周

```tsx
<Calendar weekStartsOn={1} />
```

### 格式化日期

```tsx
const formatter = (day: CalendarDay) => {
  const year = day.date.getFullYear()
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()
  const week = day.date.getDay()

  if (month === 5) {
    if (date === 1) {
      day.bottomInfo = '劳动节'
    }
    if (date <= 3) {
      day.topInfo = <View style={{ color: 'var(--sar-danger)' }}>休</View>
    }
    if (date === 4) {
      day.bottomInfo = '青年节'
    }

    if (week === 0) {
      const weekOnFirstDay = new Date(year, month - 1, 1).getDay()
      const secondSunday = 15 - (weekOnFirstDay || 7)

      if (secondSunday === date) {
        day.bottomInfo = '母亲节'
      }
    }
  }

  if (day.type === 'start') {
    day.bottomInfo = '入店'
  } else if (day.type === 'end') {
    day.bottomInfo = '离店'
  }

  if (week === 0 || week === 6) {
    day.style = {
      fontWeight: 'bold',
      color: 'var(--sar-danger)',
    }
  }
}
```

```tsx
<Calendar
  type="range"
  min={new Date(2000, 4, 1)}
  max={new Date(2000, 6, 1)}
  formatter={formatter}
/>
```

## API

### CalendarProps

| 属性         | 描述                                                                 | 类型                              | 默认值                  |
| ------------ | -------------------------------------------------------------------- | --------------------------------- | ----------------------- |
| type         | 日历类型                                                             | 'single' \| 'multiple' \| 'range' | 'single'                |
| value        | 选中的日期，单选时为当个日期，多选时为日期数组，范围时为两个日期数组 | Date \| Date[]                    | -                       |
| defaultValue | 默认选中的日期                                                       | Date \| Date[]                    | -                       |
| onChange     | 选择的日期改变时触发                                                 | (value: Date \| Date[]) => void   | -                       |
| min          | 可选择的最小日期                                                     | Date                              | 当前日期                |
| max          | 可选择的最大日期                                                     | Date                              | 当前日期的六个月后      |
| title        | 日历标题                                                             | React.ReactNode                   | -                       |
| disabledDate | 指定禁选日期，返回 `true` 表示禁选                                   | (date: Date) => boolean           | -                       |
| maxDays      | 最多可选天数，用于多选和范围                                         | number                            | Number.MAX_SAFE_INTEGER |
| overMaxDays  | 超出最多可选天数时触发                                               | () => void                        | -                       |
| weekStartsOn | 指定一周以周几开始，`0` 表示周日，`1-6` 分别表示周一至周六           | number                            | 0                       |
| formatter    | 通过修改 `day` 对象属性值，来自定义日期的文案和样式                  | (day: CalendarDay) => void        | -                       |
| allowSameDay | 范围选择中，是否允许起始和结束为同一天                               | boolean                           | false                   |

### CalendarDay

| 属性       | 描述                             | 类型                                                                           |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------ |
| date       | 日期对应的 Date 对象             | Date                                                                           |
| type       | 日期类型，每个类型对应的含义如下 | 'same' \| 'start' \| 'middle' \| 'end' \| 'disabled' \| 'selected' \| 'normal' |
| text       | 中间显示的文字                   | React.ReactNode                                                                |
| topInfo    | 上方的提示信息                   | React.ReactNode                                                                |
| bottomInfo | 下方的提示信息                   | React.ReactNode                                                                |
| className  | 额外类名                         | string                                                                         |
| style      | 额外样式                         | React.CSSProperties                                                            |

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

### CalendarRef

| 属性         | 描述                                                                                                       | 类型                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| scrollToDate | 滚动到指定日期，`align` 表示垂直方向的对齐，默认值为 `nearest`；对齐的行为同 `Element.scrollIntoView` 接口 | (date: Date, align: 'start' \| 'center' \| 'end' \| 'nearest') => void |

## 主题定制

### CSS 变量

%{variables}
