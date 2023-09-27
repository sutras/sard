import { View } from '@tarojs/components'
import { useState } from 'react'
import { Radio, Space, SpaceAlign } from 'sard-taro'

export default () => {
  const [align, setAlign] = useState<SpaceAlign>('start')

  return (
    <Space>
      <Space direction="horizontal" wrap>
        <Radio.Group value={align} onChange={setAlign}>
          {['start', 'center', 'end', 'stretch', 'baseline'].map((item) => (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </Space>

      <Space direction="horizontal" align={align}>
        <Space
          align="center"
          style={{ width: 100, padding: 10, backgroundColor: 'tomato' }}
        >
          {align}
        </Space>
        <View style={{ width: 100, height: 100, backgroundColor: 'tomato' }} />
      </Space>
    </Space>
  )
}
