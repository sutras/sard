/*
### 垂直步骤条
*/

import { Steps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [current, setCurrent] = useState(1)

  return (
    <>
      <Steps vertical current={current}>
        <Steps.Step>
          <div>步骤1</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step>
          <div>步骤2</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step>
          <div>步骤3</div>
          <div>这是描述</div>
        </Steps.Step>
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
