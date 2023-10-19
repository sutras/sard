import { List, Steps } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item>
        <Steps current={1} center status="error">
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </List.Item>
    </List>
  )
}
