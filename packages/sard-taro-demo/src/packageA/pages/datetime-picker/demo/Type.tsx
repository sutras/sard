import { Cell, DatetimePicker, PopoutInput, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Cell.Group card>
        <Cell>
          <PopoutInput title="日期" inputProps={{ placeholder: '日期' }}>
            <DatetimePicker type="yMd" />
          </PopoutInput>
        </Cell>

        <Cell>
          <PopoutInput title="月份" inputProps={{ placeholder: '月份' }}>
            <DatetimePicker type="yM" />
          </PopoutInput>
        </Cell>

        <Cell>
          <PopoutInput title="时间" inputProps={{ placeholder: '时间' }}>
            <DatetimePicker type="yMd" />
          </PopoutInput>
        </Cell>

        <Cell>
          <PopoutInput
            title="日期时间"
            inputProps={{ placeholder: '日期时间' }}
          >
            <DatetimePicker type="yMdhm" />
          </PopoutInput>
        </Cell>
      </Cell.Group>
    </Space>
  )
}
