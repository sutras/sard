import { View } from '@tarojs/components'
import { Calendar, CalendarDay, Cell, PopoutInput } from 'sard-taro'

export default () => {
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

  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar
            type="range"
            min={new Date(2000, 4, 1)}
            max={new Date(2000, 5, 0)}
            formatter={formatter}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
