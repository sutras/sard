import { Cell, Steps } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <Steps clickable center current={1} disabled>
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </Cell>
    </Cell.Group>
  )
}
