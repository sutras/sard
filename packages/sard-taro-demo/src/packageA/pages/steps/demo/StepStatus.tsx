import { View } from '@tarojs/components'
import { Cell, Steps } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <Steps vertical lineColor="#ddd">
          <Steps.Step status="finish">
            <View>第1节</View>
            <View className="small">已学习</View>
          </Steps.Step>
          <Steps.Step status="process">
            <View>第2节</View>
            <View className="small">学习中</View>
          </Steps.Step>
          <Steps.Step status="wait">
            <View>第3节</View>
            <View className="small">未学习</View>
          </Steps.Step>
          <Steps.Step status="finish">
            <View>第4节</View>
            <View className="small">已学习</View>
          </Steps.Step>
          <Steps.Step status="error">
            <View>第5节</View>
            <View className="small">出错了</View>
          </Steps.Step>
        </Steps>
      </Cell>
    </Cell.Group>
  )
}
