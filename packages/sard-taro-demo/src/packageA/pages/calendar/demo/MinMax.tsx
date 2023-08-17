import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar min={new Date(2000, 0, 15)} max={new Date(2000, 0, 30)} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
