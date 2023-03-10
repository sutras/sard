/*
### 格式化
*/

import { DatetimePicker, DatetimeLetter, DatetimeColumnOption } from 'sard'

// const weeks = ['日', '一', '二', '三', '四', '五', '六']

export default function () {
  const formatter = (
    letter: DatetimeLetter,
    option: DatetimeColumnOption,
    date: Date,
  ) => {
    if (letter === 'y') {
      return option.zerofill + '年'
    }
    if (letter === 'M') {
      return option.zerofill + '月'
    }
    if (letter === 'd') {
      return `${option.zerofill}日`
      // const d = new Date(date)
      // d.setDate(option.value)
      // return `${option.zerofill}日 星期${weeks[d.getDay()]}`
    }
  }

  return (
    <>
      <DatetimePicker type="yMd" formatter={formatter} />
    </>
  )
}
