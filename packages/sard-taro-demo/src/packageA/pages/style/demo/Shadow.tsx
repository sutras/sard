import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

function renderBox(value: string, text: string) {
  return (
    <View key={value} className="demo-shadow-box" style={{ boxShadow: value }}>
      {text}
    </View>
  )
}

const shadowList: [string, string][] = [
  ['var(--sar-shadow-sm)', 'sm 小'],
  ['var(--sar-shadow)', '默认'],
  ['var(--sar-shadow-lg)', 'lg 大'],
]

export default () => {
  return (
    <Space>
      {shadowList.map((item) => {
        return renderBox(...item)
      })}
    </Space>
  )
}
