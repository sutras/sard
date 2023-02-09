/*
### 受控组件
*/

import { Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('受控组件')
  return (
    <>
      <Input value={value} onChange={setValue} />
      {value}
    </>
  )
}
