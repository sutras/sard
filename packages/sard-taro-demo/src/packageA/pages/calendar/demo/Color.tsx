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
          <Calendar type="range" />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
