import { useState } from 'react'
import { ProgressCircle, Space, Stepper } from 'sard-taro'

export default () => {
  const [percent, setPercent] = useState(50)

  return (
    <Space align="start">
      <Stepper
        value={percent}
        max={100}
        min={0}
        onChange={(value) => setPercent(Number(value))}
      />

      <ProgressCircle percent={percent}>{percent + '%'}</ProgressCircle>
    </Space>
  )
}
