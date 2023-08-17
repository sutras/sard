import {
  Cell,
  DatetimeColumnOption,
  DatetimeLetter,
  DatetimePicker,
  PopoutInput,
} from 'sard-taro'

const formatter = (letter: DatetimeLetter, option: DatetimeColumnOption) => {
  if (letter === 'y') {
    return option.zerofill + '年'
  }
  if (letter === 'M') {
    return option.zerofill + '月'
  }
  if (letter === 'd') {
    return `${option.zerofill}日`
  }
}

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="yMd" formatter={formatter} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
