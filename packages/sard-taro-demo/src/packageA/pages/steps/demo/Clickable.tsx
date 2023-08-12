import { View } from '@tarojs/components'
import { Cell, Steps } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <Steps clickable center current={1}>
          <Steps.Step>步骤1</Steps.Step>
          <Steps.Step>步骤2</Steps.Step>
          <Steps.Step>步骤3</Steps.Step>
        </Steps>
      </Cell>
      <Cell>
        <Steps clickable center vertical current={1}>
          <Steps.Step>
            <View>步骤1</View>
            <View>这是描述</View>
          </Steps.Step>
          <Steps.Step>
            <View>步骤2</View>
            <View>这是描述</View>
          </Steps.Step>
          <Steps.Step>
            <View>步骤3</View>
            <View>这是描述</View>
          </Steps.Step>
        </Steps>
      </Cell>
    </Cell.Group>
  )
}
