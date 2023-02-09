/*
### 受控
*/

import { Stepper } from 'sard'
import { useState } from 'react'

export default function () {
  const [count, setCount] = useState<number>()
  return (
    <>
      <Stepper value={count} onChange={setCount} />
    </>
  )
}
