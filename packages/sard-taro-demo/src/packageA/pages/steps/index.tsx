import { useState } from 'react'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Icon, Steps } from 'sard-taro'
import { View } from '@tarojs/components'

import './index.scss'

export default () => {
  const [current, setCurrent] = useState(1)
  const [current2, setCurrent2] = useState(1)

  const prevStep = () => {
    setCurrent(current <= 0 ? 3 : current - 1)
  }

  const nextStep = () => {
    setCurrent(current >= 3 ? 0 : current + 1)
  }

  return (
    <Page className="page-steps">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell title="上一步" onClick={prevStep} linkable></Cell>
          <Cell title="下一步" onClick={nextStep} linkable></Cell>
          <Cell>
            <Steps current={current}>
              <Steps.Step>步骤1</Steps.Step>
              <Steps.Step>步骤2</Steps.Step>
              <Steps.Step>步骤3</Steps.Step>
            </Steps>
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="居中" full>
        <Cell.Group card>
          <Cell title="上一步" onClick={prevStep} linkable></Cell>
          <Cell title="下一步" onClick={nextStep} linkable></Cell>
          <Cell>
            <Steps current={current} center>
              <Steps.Step>步骤1</Steps.Step>
              <Steps.Step>步骤2</Steps.Step>
              <Steps.Step>步骤3</Steps.Step>
            </Steps>
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="垂直步骤条" full>
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
      </Demo>

      <Demo title="垂直居中" full>
        <Cell.Group card>
          <Cell title="上一步" onClick={prevStep} linkable></Cell>
          <Cell title="下一步" onClick={nextStep} linkable></Cell>
          <Cell>
            <Steps vertical center current={current}>
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
      </Demo>

      <Demo title="自定义图标" full>
        <Cell.Group card>
          <Cell title="上一步" onClick={prevStep} linkable></Cell>
          <Cell title="下一步" onClick={nextStep} linkable></Cell>
          <Cell>
            <Steps
              center
              current={current}
              icon={(status) => (
                <Icon
                  size={18}
                  name={status === 'finish' ? 'star-fill' : 'star'}
                ></Icon>
              )}
            >
              <Steps.Step>步骤1</Steps.Step>
              <Steps.Step>步骤2</Steps.Step>
              <Steps.Step>步骤3</Steps.Step>
            </Steps>
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="当前步骤状态" full>
        <Cell.Group card>
          <Cell
            title="上一步"
            onClick={() => setCurrent2(current2 <= -1 ? 2 : current2 - 1)}
            linkable
          ></Cell>
          <Cell
            title="下一步"
            onClick={() => setCurrent2(current2 >= 2 ? -1 : current2 + 1)}
            linkable
          ></Cell>
          <Cell>
            <Steps vertical status="finish" current={current2}>
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
      </Demo>

      <Demo title="错误步骤" full>
        <Cell.Group card>
          <Cell>
            <Steps current={1} center status="error">
              <Steps.Step>步骤1</Steps.Step>
              <Steps.Step>步骤2</Steps.Step>
              <Steps.Step>步骤3</Steps.Step>
            </Steps>
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="自定义各步骤状态" full>
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
      </Demo>

      <Demo title="可点击的" full>
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
      </Demo>

      <Demo title="禁用" full>
        <Cell.Group card>
          <Cell>
            <Steps clickable center current={1} disabled>
              <Steps.Step>步骤1</Steps.Step>
              <Steps.Step>步骤2</Steps.Step>
              <Steps.Step>步骤3</Steps.Step>
            </Steps>
          </Cell>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
