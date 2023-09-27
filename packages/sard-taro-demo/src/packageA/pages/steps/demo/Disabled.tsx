import { List, Steps } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item>
        <Steps clickable center current={1} disabled>
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </List.Item>
    </List>
  )
}
