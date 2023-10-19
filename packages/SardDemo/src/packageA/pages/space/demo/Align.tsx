import { useState } from 'react'
import { Button, Radio, Space, SpaceAlign } from 'sard'

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
          style={{
            width: 100,
            padding: 10,
            color: 'white',
            backgroundColor: 'tomato',
          }}
        >
          {align}
        </Space>
        <Button style={{ width: 100, height: 100 }}>按钮</Button>
      </Space>
    </Space>
  )
}
