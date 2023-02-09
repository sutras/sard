/*
### 当前步骤状态
*/

import { Steps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [current, setCurrent] = useState(1)

  return (
    <>
      <Steps vertical status="finish" current={current}>
        <Steps.Step>
          <div>订单已提交</div>
          <small>01月01日 12:00</small>
        </Steps.Step>
        <Steps.Step>
          <div>支付成功</div>
          <small>01月01日 12:05</small>
        </Steps.Step>
        <Steps.Step>
          <div>商家已接单</div>
          <small>01月01日 12:10</small>
        </Steps.Step>
        <Steps.Step>
          <div>订单已完成</div>
          <small>01月01日 12:30</small>
        </Steps.Step>
      </Steps>
      <Button onClick={() => setCurrent(current === -1 ? 3 : current - 1)}>
        上一步
      </Button>{' '}
      <Button onClick={() => setCurrent(current === 3 ? -1 : current + 1)}>
        下一步
      </Button>
    </>
  )
}
