import { Cell, DatetimePicker, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Cell.Group card>
        <Cell title="年月日" value="2021-04-13, 2023-07-08" />
        <Cell>
          <DatetimePicker
            type="yMd"
            min={new Date(2021, 4, 13)}
            max={new Date(2023, 6, 8)}
          />
        </Cell>
      </Cell.Group>

      <Cell.Group card>
        <Cell title="时分秒" value="09:00:00, 18:30:00" />
        <Cell>
          <DatetimePicker
            type="hms"
            min={new Date(0, 0, 1, 9, 0, 0)}
            max={new Date(0, 0, 1, 18, 30, 0)}
          />
        </Cell>
      </Cell.Group>

      <Cell.Group card>
        <Cell title="日时分" value="01日 09:45, 06日 12:12" />
        <Cell>
          <DatetimePicker
            type="dhm"
            min={new Date(0, 0, 1, 9, 45)}
            max={new Date(0, 0, 6, 12, 12)}
          />
        </Cell>
      </Cell.Group>
    </Space>
  )
}
