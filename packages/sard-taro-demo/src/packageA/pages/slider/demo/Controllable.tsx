import { useState } from 'react'
import { Cell, Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(50)

  const [rangeValue3, setRangeValue3] = useState([20, 80])

  return (
    <Space vertical>
      <Cell.Group card>
        <Cell linkable title="设置值为：50" onClick={() => setValue(50)}></Cell>
        <Cell>
          <Slider value={value} onChange={setValue} />
        </Cell>
      </Cell.Group>

      <Cell.Group card>
        <Cell
          linkable
          title="设置值为：[20, 80]"
          onClick={() => setRangeValue3([20, 80])}
        ></Cell>
        <Cell>
          <Slider range value={rangeValue3} onChange={setRangeValue3} />
        </Cell>
      </Cell.Group>
    </Space>
  )
}
