import { View } from '@tarojs/components'
import { useState } from 'react'
import { Slider, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState([0, 50])

  return (
    <Space vertical>
      <Slider range defaultValue={value} onChange={setValue} />
      <View>{value.join(',')}</View>
    </Space>
  )
}
