import { Cell, DatetimeLetter, DatetimePicker } from 'sard-taro'

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
        <DatetimePicker type="hm" filter={filter} />
      </Cell>
    </Cell.Group>
  )
}
