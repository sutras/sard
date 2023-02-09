/*
### 自定义步骤状态
*/

import { Steps } from 'sard'

export default function () {
  return (
    <>
      <Steps vertical lineColor="#ddd">
        <Steps.Step status="finish">
          <div>第1节</div>
          <small>已学习</small>
        </Steps.Step>
        <Steps.Step status="process">
          <div>第2节</div>
          <small>学习中</small>
        </Steps.Step>
        <Steps.Step status="wait">
          <div>第3节</div>
          <small>未学习</small>
        </Steps.Step>
        <Steps.Step status="finish">
          <div>第4节</div>
          <small>已学习</small>
        </Steps.Step>
        <Steps.Step status="process">
          <div>第5节</div>
          <small>学习中</small>
        </Steps.Step>
        <Steps.Step status="finish">
          <div>第6节</div>
          <small>已学习</small>
        </Steps.Step>
        <Steps.Step status="wait">
          <div>第7节</div>
          <small>未学习</small>
        </Steps.Step>
      </Steps>
    </>
  )
}
