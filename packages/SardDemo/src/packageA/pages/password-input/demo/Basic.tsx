import { useState } from 'react'
import { PasswordInput } from 'sard'

export default () => {
  const [value, setValue] = useState('')

  return <PasswordInput value={value} onChange={setValue} />
}
