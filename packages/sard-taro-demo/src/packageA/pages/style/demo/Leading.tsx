import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

function renderBox(value: string, title: string) {
  return (
    <View key={value} className="demo-leading-box">
      <View className="demo-leading-title">{title}</View>
      <View className="demo-leading-content" style={{ lineHeight: value }}>
        胜日寻芳泗水滨，无边光景一时新。 等闲识得东风面，万紫千红总是春。
      </View>
    </View>
  )
}

const leadingList: [string, string][] = [
  ['var(--sar-leading-none)', 'none'],
  ['var(--sar-leading-tight)', 'tight'],
  ['var(--sar-leading-snug)', 'snug'],
  ['var(--sar-leading-normal)', 'normal'],
  ['var(--sar-leading-relaxed)', 'relaxed'],
  ['var(--sar-leading-loose)', 'loose'],
]

export default () => {
  return (
    <Space>
      {leadingList.map((item) => {
        return renderBox(...item)
      })}
    </Space>
  )
}
