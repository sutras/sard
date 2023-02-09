/*
### 受控
*/

import { Slider, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState(50)
  const [rangeValue, setRangeValue] = useState([20, 80] as [number, number])
  const handleChange = (value: number) => {
    setValue(value)
  }
  const handleRangeChanging = (value: [number, number]) => {
    setRangeValue(value)
  }

  return (
    <>
      <Slider value={value} onChange={handleChange} />
      <Button onClick={() => setValue(50)}>change to 50</Button> {value}
      <br />
      <br />
      <Slider value={rangeValue} range onChange={handleRangeChanging} />
      <Button onClick={() => setRangeValue([20, 80])}>
        change to [20, 80]
      </Button>{' '}
      {rangeValue.join(',')}
    </>
  )
}
