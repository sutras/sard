import { useState } from 'react'
import { List, Steps } from 'sard'

export default () => {
  const [current, setCurrent] = useState(1)
  const prevStep = () => {
    setCurrent(current <= 0 ? 3 : current - 1)
  }

  const nextStep = () => {
    setCurrent(current >= 3 ? 0 : current + 1)
  }

  return (
    <List card>
      <List.Item title="上一步" onClick={prevStep} linkable />
      <List.Item title="下一步" onClick={nextStep} linkable />
      <List.Item>
        <Steps center current={current} color="tomato">
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </List.Item>
    </List>
  )
}
