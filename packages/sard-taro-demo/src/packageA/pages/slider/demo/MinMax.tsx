import { useState } from 'react'
import { List, Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(0)

  const [rangeValue, setRangeValue] = useState([0, 30])

  return (
    <Space>
      <List card>
        <List.Item title="当前值" label="值范围：[-50, 50]" value={value} />
        <List.Item>
          <Slider value={value} min={-50} max={50} onChange={setValue} />
        </List.Item>
      </List>

      <List card>
        <List.Item
          title="当前值"
          label="值范围：[-50, 50]"
          value={rangeValue.join(', ')}
        />
        <List.Item>
          <Slider
            range
            value={rangeValue}
            min={-50}
            max={50}
            onChange={setRangeValue}
          />
        </List.Item>
      </List>
    </Space>
  )
}
