import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          style={{
            '--sar-primary': 'var(--sar-pink)',
            '--sar-calendar-day-selected-bg': 'var(--sar-pink)',
            '--sar-calendar-day-today-color': 'var(--sar-pink)',
          }}
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar
            type="range"
            min={new Date(2000, 0, 1)}
            max={new Date(2000, 1, 0)}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
