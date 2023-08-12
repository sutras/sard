import { useState } from 'react'
import { Rate, Slider, Space } from 'sard-taro'

export default () => {
  const [count, setCount] = useState(3)

  return (
    <Space vertical gap="large">
      <Slider min={1} max={9} value={count} onChange={setCount}></Slider>

      <Rate count={count} defaultValue={1.5} allowHalf />
    </Space>
  )
}
