import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar
            weekStartsOn={1}
            min={new Date(2000, 0, 1)}
            max={new Date(2000, 1, 0)}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
