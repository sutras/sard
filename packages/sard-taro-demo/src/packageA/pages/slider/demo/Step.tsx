import { View } from '@tarojs/components'
import { useState } from 'react'
import { Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(0)

  const [rangeValue5, setRangeValue5] = useState([0, 0])

  return (
    <Space vertical>
      <Space vertical>
        <Slider defaultValue={50} step={10} onChange={setValue} />
        <View>{value}</View>
      </Space>

      <Space vertical>
        <Slider
          range
          defaultValue={[20, 80]}
          step={12.3}
          onChange={setRangeValue5}
        />
        <View>{rangeValue5.join(',')}</View>
      </Space>
    </Space>
  )
}
