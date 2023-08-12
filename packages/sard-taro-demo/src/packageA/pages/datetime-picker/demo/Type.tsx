import { Cell, DatetimePicker, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Cell.Group card>
        <Cell title="年月日" />
        <Cell>
          <DatetimePicker type="yMd" />
        </Cell>
      </Cell.Group>

      <Cell.Group card>
        <Cell title="时分秒" />
        <Cell>
          <DatetimePicker type="hms" />
        </Cell>
      </Cell.Group>

      <Cell.Group card>
        <Cell title="日时分" />
        <Cell>
          <DatetimePicker type="dhm" />
        </Cell>
      </Cell.Group>
    </Space>
  )
}
