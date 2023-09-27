import { useState } from 'react'
import { Radio, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('option1')

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Space gap="medium">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Space>
    </Radio.Group>
  )
}
