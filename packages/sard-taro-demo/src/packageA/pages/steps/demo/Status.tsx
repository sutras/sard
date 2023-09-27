import { View } from '@tarojs/components'
import { useState } from 'react'
import { List, Steps } from 'sard-taro'

import '../index.scss'

export default () => {
  const [current, setCurrent] = useState(1)

  return (
    <List card>
      <List.Item
        title="上一步"
        onClick={() => setCurrent(current <= -1 ? 2 : current - 1)}
        linkable
      />
      <List.Item
        title="下一步"
        onClick={() => setCurrent(current >= 2 ? -1 : current + 1)}
        linkable
      />
      <List.Item>
        <Steps direction="vertical" status="finish" current={current}>
          <Steps.Step>
            <View>订单已提交</View>
            <View className="demo-steps-small">01月01日 12:00</View>
          </Steps.Step>
          <Steps.Step>
            <View>正在处理中</View>
            <View className="demo-steps-small">01月01日 12:05</View>
          </Steps.Step>
          <Steps.Step>
            <View>订单已完成</View>
            <View className="demo-steps-small">01月01日 12:10</View>
          </Steps.Step>
        </Steps>
      </List.Item>
    </List>
  )
}
