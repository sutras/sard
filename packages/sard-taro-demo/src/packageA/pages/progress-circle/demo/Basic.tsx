import { useState } from 'react'
import { ProgressCircle, Space, Stepper } from 'sard-taro'

export default () => {
  const [percent, setPercent] = useState(50)

  return (
    <Space vertical align="start">
      <Stepper
        value={percent}
        max={100}
        min={0}
        onChange={(value) => setPercent(Number(value))}
        style={{ marginBottom: 10 }}
      ></Stepper>

      <ProgressCircle percent={percent}>{percent}%</ProgressCircle>
    </Space>
  )
}
