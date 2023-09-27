import { useState } from 'react'
import { Rate } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(3)

  return <Rate value={value} onChange={setValue} />
}
