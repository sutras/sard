import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  // 禁用周末
  const disabledDate = (date: Date) => {
    return /0|6/.test(String(date.getDay()))
  }

  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar disabledDate={disabledDate} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
