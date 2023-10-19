import { useState } from 'react'
import { Rate } from 'sard'

export default () => {
  const [value, setValue] = useState(3)

  return <Rate value={value} onChange={setValue} />
}
