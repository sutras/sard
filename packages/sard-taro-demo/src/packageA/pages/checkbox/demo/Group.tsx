import { useState } from 'react'
import { Checkbox, Space } from 'sard-taro'

export default () => {
  const [value, setValue] = useState<string[]>(['apple'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Space gap="medium">
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="banana">香蕉</Checkbox>
        <Checkbox value="peach">桃子</Checkbox>
      </Space>
    </Checkbox.Group>
  )
}
