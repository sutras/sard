import { Cell, DatetimePicker, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput title="日期" inputProps={{ placeholder: '日期' }}>
          <DatetimePicker type="yMd" />
        </PopoutInput>
      </Cell>

      <Cell>
        <PopoutInput title="时间" inputProps={{ placeholder: '时间' }}>
          <DatetimePicker type="hms" />
        </PopoutInput>
      </Cell>

      <Cell>
        <PopoutInput title="日期时间" inputProps={{ placeholder: '日期时间' }}>
          <DatetimePicker type="yMdhm" />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
