import {
  List,
  DatetimeColumnOption,
  DatetimeLetter,
  DatetimePicker,
  PopoutInput,
} from 'sard-taro'

const monthAbbreviations = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

function getEnglishDateRepresentation(day) {
  let suffix = 'th'

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  }

  return day + suffix
}

const formatter = (letter: DatetimeLetter, option: DatetimeColumnOption) => {
  if (letter === 'M') {
    return monthAbbreviations[option.value - 1]
  }
  if (letter === 'd') {
    return getEnglishDateRepresentation(option.value)
  }
  if (letter === 'y') {
    return option.zerofill
  }
}

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="Mdy" formatter={formatter} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
