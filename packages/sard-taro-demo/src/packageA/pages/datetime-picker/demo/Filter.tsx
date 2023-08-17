import { Cell, DatetimeLetter, DatetimePicker, PopoutInput } from 'sard-taro'

const filter = (letter: DatetimeLetter, value: number) => {
  if (letter === 'm') {
    return value % 15 === 0
  }
  return true
}

export default () => {
  return (
    <Cell.Group card>
      <Cell title="“分钟”取15的倍数：" />
      <Cell>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="hm" filter={filter} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
