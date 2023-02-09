/*
### 范围选择
*/

import { Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState([0, 50] as [number, number])
  const handleChange = (value: [number, number]) => {
    setValue(value)
  }
  return (
    <>
      <Slider defaultValue={value} range onChange={handleChange} />
      {value.join(',')}
    </>
  )
}
