import { View } from '@tarojs/components'
import { useState } from 'react'
import { Cell, Steps } from 'sard-taro'

import '../index.scss'

export default () => {
  const [current, setCurrent] = useState(1)

  return (
    <Cell.Group card>
      <Cell
        title="上一步"
        onClick={() => setCurrent(current <= -1 ? 2 : current - 1)}
        linkable
      ></Cell>
      <Cell
        title="下一步"
        onClick={() => setCurrent(current >= 2 ? -1 : current + 1)}
        linkable
      ></Cell>
      <Cell>
        <Steps vertical status="finish" current={current}>
          <Steps.Step>
            <View>订单已提交</View>
            <View className="small">01月01日 12:00</View>
          </Steps.Step>
          <Steps.Step>
            <View>正在处理中</View>
            <View className="small">01月01日 12:05</View>
          </Steps.Step>
          <Steps.Step>
            <View>订单已完成</View>
            <View className="small">01月01日 12:10</View>
          </Steps.Step>
        </Steps>
      </Cell>
    </Cell.Group>
  )
}
