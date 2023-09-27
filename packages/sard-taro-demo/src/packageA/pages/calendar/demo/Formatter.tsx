import { Text } from '@tarojs/components'
import { Calendar, CalendarDay, List, PopoutInput } from 'sard-taro'

export default () => {
  const formatter = (day: CalendarDay) => {
    const year = day.date.getFullYear()
    const month = day.date.getMonth() + 1
    const date = day.date.getDate()
    const week = day.date.getDay()

    if (month === 5) {
      if (date === 1) {
        day.bottom = '劳动节'
      }
      if (date <= 3) {
        day.top = <Text style={{ color: 'tomato' }}>休</Text>
      }
      if (date === 4) {
        day.bottom = '青年节'
      }

      if (week === 0) {
        const weekOnFirstDay = new Date(year, month - 1, 1).getDay()
        const secondSunday = 15 - (weekOnFirstDay || 7)

        if (secondSunday === date) {
          day.bottom = '母亲节'
        }
      }
    }

    if (day.type === 'start') {
      day.bottom = '入店'
    } else if (day.type === 'end') {
      day.bottom = '离店'
    }

    if (week === 0 || week === 6) {
      day.style = {
        fontWeight: 'bold',
        color: 'tomato',
      }
    }
  }

  return (
    <List card>
      <List.Item>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar
            type="range"
            defaultCurrentDate={new Date(new Date().getFullYear(), 4, 1)}
            formatter={formatter}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
