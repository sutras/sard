import { useState } from 'react'
import { Button, Radio, Space, SpaceJustify } from 'sard-taro'

export default () => {
  const [justify, setJustify] = useState<SpaceJustify>('start')

  return (
    <Space>
      <Space direction="horizontal" wrap>
        <Radio.Group value={justify} onChange={setJustify}>
          {['start', 'center', 'end', 'around', 'between', 'evenly'].map(
            (item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ),
          )}
        </Radio.Group>
      </Space>

      <Space
        direction="horizontal"
        justify={justify}
        gap={0}
        style={{ borderWidth: 5, borderColor: '#ddd', borderStyle: 'solid' }}
      >
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>
    </Space>
  )
}
