import { Calendar, List, PopoutInput } from 'sard'

export default () => {
  // 禁用周末
  const disabledDate = (date: Date) => {
    return /0|6/.test(String(date.getDay()))
  }

  return (
    <List card>
      <List.Item>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar disabledDate={disabledDate} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
