import { List, DatetimePicker, PopoutInput } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput title="日期" inputProps={{ placeholder: '日期' }}>
          <DatetimePicker
            type="yMd"
            min={new Date(2000, 4, 13)}
            max={new Date(2003, 6, 8)}
          />
        </PopoutInput>
      </List.Item>

      <List.Item>
        <PopoutInput title="时间" inputProps={{ placeholder: '时间' }}>
          <DatetimePicker
            type="hms"
            min={new Date(0, 0, 1, 9, 0, 0)}
            max={new Date(0, 0, 1, 18, 30, 0)}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
