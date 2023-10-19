import { useState } from 'react'
import { Rate, Slider, Space } from 'sard'

export default () => {
  const [count, setCount] = useState(3)

  return (
    <Space gap="large">
      <Slider min={1} max={9} value={count} onChange={setCount} />

      <Rate count={count} defaultValue={1.5} allowHalf />
    </Space>
  )
}
