/*
### 基础使用
*/

import { Steps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [current, setCurrent] = useState(1)

  return (
    <>
      <Steps current={current}>
        <Steps.Step>步骤1</Steps.Step>
        <Steps.Step>步骤2</Steps.Step>
        <Steps.Step>步骤3</Steps.Step>
      </Steps>
      <Button onClick={() => setCurrent(current === 0 ? 3 : current - 1)}>
        上一步
      </Button>{' '}
      <Button onClick={() => setCurrent(current === 3 ? 0 : current + 1)}>
        下一步
      </Button>
    </>
  )
}
