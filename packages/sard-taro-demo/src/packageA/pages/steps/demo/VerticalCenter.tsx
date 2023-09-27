import { View } from '@tarojs/components'
import { useState } from 'react'
import { List, Steps } from 'sard-taro'

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
        <Steps direction="vertical" center current={current}>
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
      </List.Item>
    </List>
  )
}
