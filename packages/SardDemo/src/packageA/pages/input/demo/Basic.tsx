import { useState } from 'react'
import { Input } from 'sard'

export default () => {
  const [value, setValue] = useState<string>()

  return <Input placeholder="请输入" value={value} onChange={setValue} />
}
