/*
### 禁用
*/

import { Steps } from 'sard'

export default function () {
  return (
    <>
      <Steps clickable center current={1} disabled>
        <Steps.Step>步骤1</Steps.Step>
        <Steps.Step>步骤2</Steps.Step>
        <Steps.Step>步骤3</Steps.Step>
      </Steps>

      <Steps clickable center vertical current={1} disabled>
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
    </>
  )
}
