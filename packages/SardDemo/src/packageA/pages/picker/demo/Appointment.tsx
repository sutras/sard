import { useState } from 'react'
import { List, Picker, PopoutInput, toDateNumber } from 'sard'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const today = new Date()

const getDates = () => {
  return Array(30)
    .fill(0)
    .map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const week = i === 0 ? '今天' : `星期${weekDays[date.getDay()]}`

      return {
        label: `${date.getMonth() + 1}月${date.getDate()}日 ${week}`,
        value: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        date,
      }
    })
    .filter((item, i) => {
      if (i === 0 && today.getHours() > 17) {
        return false
      }
      const week = item.date.getDay()
      return week !== 6 && week !== 0
    })
}

const getHours = () => {
  return Array(24)
    .fill(0)
    .map((_, i) => {
      return {
        label: `${i}:00`,
        value: i,
      }
    })
    .filter((item) => {
      return (
        (item.value >= 9 && item.value <= 12) ||
        (item.value >= 14 && item.value <= 17)
      )
    })
}

export default () => {
  const [columns, setColumns] = useState(() => {
    const dates = getDates()
    const isToday = toDateNumber(dates[0].date) === toDateNumber(today)

    return [
      dates,
      getHours().filter((item) =>
        isToday ? item.value > today.getHours() : true,
      ),
    ]
  })

  const [value, setValue] = useState<[string, number]>()

  const handleChange = (_, selectedOptions) => {
    const isToday =
      toDateNumber(selectedOptions[0].date) === toDateNumber(today)
    setColumns([
      columns[0],
      getHours().filter((item) =>
        isToday ? item.value > today.getHours() : true,
      ),
    ])
  }

  const selectNextMonday = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const dayUntilMonday = 7 + 1 - currentDay
    const nextMonday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + dayUntilMonday,
    )
    setValue([
      `${nextMonday.getFullYear()}-${
        nextMonday.getMonth() + 1
      }-${nextMonday.getDate()}`,
      9,
    ])
  }

  return (
    <List card>
      <List.Item linkable title="设置为: 下周一" onClick={selectNextMonday} />
      <List.Item linkable title="清空" onClick={() => setValue(undefined)} />
      <List.Item>
        <PopoutInput
          title="请选择预约时间"
          inputProps={{ placeholder: '请选择预约时间' }}
          value={value}
          onChange={setValue}
        >
          <Picker
            columns={columns}
            onChange={handleChange}
            outletFormatter={(labels) => labels.join(' ')}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
