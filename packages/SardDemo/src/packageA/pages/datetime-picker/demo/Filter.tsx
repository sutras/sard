import { List, DatetimeLetter, DatetimePicker, PopoutInput } from 'sard'

const filter = (letter: DatetimeLetter, value: number) => {
  if (letter === 'm') {
    return value % 15 === 0
  }
  return true
}

export default () => {
  return (
    <List card>
      <List.Item title="“分钟”取15的倍数：" />
      <List.Item>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="hm" filter={filter} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
