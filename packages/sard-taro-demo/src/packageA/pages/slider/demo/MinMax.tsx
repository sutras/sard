import { View } from '@tarojs/components'
import { useState } from 'react'
import { Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(0)

  const [rangeValue4, setRangeValue4] = useState([0, 30])

  return (
    <Space vertical>
      <Space vertical>
        <Slider defaultValue={0} min={-50} max={50} onChange={setValue} />
        <View>{value}</View>
      </Space>

      <Space vertical>
        <Slider
          range
          defaultValue={rangeValue4}
          min={-50}
          max={50}
          onChange={setRangeValue4}
        />
        <View>{rangeValue4.join(',')}</View>
      </Space>
    </Space>
  )
}
