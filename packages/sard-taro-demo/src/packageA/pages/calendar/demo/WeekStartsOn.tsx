import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar weekStartsOn={1} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
