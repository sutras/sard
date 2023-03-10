/*
### 基础使用
*/

import { useState } from 'react'
import { Calendar } from 'sard'

export default function () {
  const handleChange = (date) => {
    console.log(date)

    setValue(date)
  }

  const [value, setValue] = useState<Date[]>([])

  return <Calendar value={value} type="range" onChange={handleChange} />
}
