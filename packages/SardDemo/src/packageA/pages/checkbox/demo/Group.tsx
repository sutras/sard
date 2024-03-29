import { useState } from 'react'
import { Checkbox, Space } from 'sard'

export default () => {
  const [value, setValue] = useState<string[]>(['option2'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Space gap="medium">
        <Checkbox value="option1">选项1</Checkbox>
        <Checkbox value="option2">选项2</Checkbox>
        <Checkbox value="option3">选项3</Checkbox>
      </Space>
    </Checkbox.Group>
  )
}
