import { Cell, DatetimePicker, PopoutInput, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Cell.Group card>
        <Cell>
          <PopoutInput title="日期" inputProps={{ placeholder: '日期' }}>
            <DatetimePicker
              type="yMd"
              min={new Date(2000, 4, 13)}
              max={new Date(2003, 6, 8)}
            />
          </PopoutInput>
        </Cell>

        <Cell>
          <PopoutInput title="月份" inputProps={{ placeholder: '月份' }}>
            <DatetimePicker
              type="yM"
              min={new Date(2000, 4)}
              max={new Date(2003, 6)}
            />
          </PopoutInput>
        </Cell>

        <Cell>
          <PopoutInput title="时间" inputProps={{ placeholder: '时间' }}>
            <DatetimePicker
              type="hms"
              min={new Date(0, 0, 1, 9, 0, 0)}
              max={new Date(0, 0, 1, 18, 30, 0)}
            />
          </PopoutInput>
        </Cell>
      </Cell.Group>
    </Space>
  )
}
