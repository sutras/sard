import { useState } from 'react'
import { Cell, Steps } from 'sard-taro'

export default () => {
  const [current, setCurrent] = useState(1)
  const prevStep = () => {
    setCurrent(current <= 0 ? 3 : current - 1)
  }

  const nextStep = () => {
    setCurrent(current >= 3 ? 0 : current + 1)
  }

  return (
    <Cell.Group card>
      <Cell title="上一步" onClick={prevStep} linkable></Cell>
      <Cell title="下一步" onClick={nextStep} linkable></Cell>
      <Cell>
        <Steps current={current}>
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </Cell>
    </Cell.Group>
  )
}
