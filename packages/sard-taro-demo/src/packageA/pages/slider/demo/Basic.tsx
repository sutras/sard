import { useState } from 'react'
import { List, Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(50)

  const [rangeValue, setRangeValue] = useState([20, 80])

  return (
    <Space>
      <List card>
        <List.Item
          linkable
          title="设置为：50"
          value={`当前值：${value}`}
          onClick={() => setValue(50)}
        />
        <List.Item>
          <Slider value={value} onChange={setValue} />
        </List.Item>
      </List>

      <List card>
        <List.Item
          linkable
          title="设置为：[20, 80]"
          value={`当前值：${rangeValue}`}
          onClick={() => setRangeValue([20, 80])}
        />
        <List.Item>
          <Slider range value={rangeValue} onChange={setRangeValue} />
        </List.Item>
      </List>
    </Space>
  )
}
