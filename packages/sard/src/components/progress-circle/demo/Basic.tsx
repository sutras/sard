/*
### 基础使用
*/

import { ProgressCircle, Stepper } from 'sard'
import { useState } from 'react'

export default function () {
  const [percent, setPercent] = useState(50)
  return (
    <>
      <Stepper
        value={percent}
        max={100}
        min={0}
        onChange={setPercent}
        style={{ marginBottom: 10 }}
      ></Stepper>

      <ProgressCircle percent={percent}>{percent}%</ProgressCircle>
    </>
  )
}
