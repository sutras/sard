/*
### 步长
*/

import { Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState(0)
  const [rangeValue, setRangeValue] = useState([0, 0])
  const handleChange = (value: number) => {
    setValue(value)
  }
  const handleRangeChanging = (value: [number, number]) => {
    setRangeValue(value)
  }
  return (
    <>
      <Slider defaultValue={50} step={10} onChange={handleChange} />
      {value}
      <br />
      <br />
      <Slider
        defaultValue={[20, 80]}
        step={12.2}
        range
        onChange={handleRangeChanging}
      />
      {rangeValue.join(',')}
    </>
  )
}
