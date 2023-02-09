/*
### 基础使用
*/

import { Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState(50)
  const handleChange = (value: number) => {
    setValue(value)
  }
  return (
    <>
      <Slider defaultValue={value} onChange={handleChange} />
      {value}
    </>
  )
}
