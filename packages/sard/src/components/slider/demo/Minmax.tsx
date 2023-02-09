/*
### 最大最小值
*/

import { Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState(0)
  const [rangeValue, setRangeValue] = useState([0, 0])
  const handleChange = (value: number) => {
    setValue(value)
  }
  const handleRangeChange = (value: [number, number]) => {
    setRangeValue(value)
  }
  return (
    <>
      <Slider defaultValue={0} min={-50} max={50} onChange={handleChange} />
      {value}
      <br />
      <br />
      <Slider
        defaultValue={[0, 30]}
        min={-50}
        max={50}
        range
        onChange={handleRangeChange}
      />
      {rangeValue.join(',')}
    </>
  )
}
