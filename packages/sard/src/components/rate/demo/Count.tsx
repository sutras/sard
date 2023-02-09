/*
### 自定义数量
*/

import { Rate, Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [count, setCount] = useState(3)

  return (
    <>
      <Slider min={1} max={9} value={count} onChange={setCount}></Slider>
      <Rate count={count} defaultValue={1.5} allowHalf />
    </>
  )
}
