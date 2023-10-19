import { List, DatetimePicker, PopoutInput } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput title="日期" inputProps={{ placeholder: '日期' }}>
          <DatetimePicker type="yMd" />
        </PopoutInput>
      </List.Item>

      <List.Item>
        <PopoutInput title="时间" inputProps={{ placeholder: '时间' }}>
          <DatetimePicker type="hms" />
        </PopoutInput>
      </List.Item>

      <List.Item>
        <PopoutInput title="日期时间" inputProps={{ placeholder: '日期时间' }}>
          <DatetimePicker type="Mdh" />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
