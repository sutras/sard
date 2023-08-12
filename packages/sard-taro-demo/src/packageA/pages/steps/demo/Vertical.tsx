import { View } from '@tarojs/components'
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
        <Steps vertical current={current}>
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
