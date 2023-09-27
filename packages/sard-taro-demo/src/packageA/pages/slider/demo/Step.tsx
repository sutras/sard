import { useState } from 'react'
import { List, Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(0)

  const [rangeValue, setRangeValue] = useState([0, 0])

  return (
    <Space>
      <List card>
        <List.Item title="当前值" value={value} label="步长: 10" />
        <List.Item>
          <Slider value={value} step={10} onChange={setValue} />
        </List.Item>
      </List>

      <List card>
        <List.Item
          title="当前值"
          label="步长: 12.3"
          value={rangeValue.join(', ')}
        />
        <List.Item>
          <Slider
            range
            step={12.3}
            value={rangeValue}
            onChange={setRangeValue}
          />
        </List.Item>
      </List>
    </Space>
  )
}
