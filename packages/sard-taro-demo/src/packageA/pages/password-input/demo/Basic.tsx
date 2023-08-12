import { useState } from 'react'
import { PasswordInput } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('')

  return <PasswordInput value={value} onChange={setValue} />
}
