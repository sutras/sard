import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

function renderBox(value: string, text: string) {
  return (
    <View key={value} className="demo-mask-container">
      <View className="demo-mask-text">背景文字</View>
      <View className="demo-mask-box" style={{ backgroundColor: value }}>
        {text}
      </View>
    </View>
  )
}

const maskList: [string, string][] = [
  ['var(--sar-mask-legible)', '黑色-浅色遮罩'],
  ['var(--sar-mask)', '黑色-默认遮罩'],
  ['var(--sar-mask-illegible)', '黑色-深色遮罩'],
  ['var(--sar-mask-white-legible)', '白色-浅色遮罩'],
  ['var(--sar-mask-white)', '白色-默认遮罩'],
  ['var(--sar-mask-white-illegible)', '白色-深色遮罩'],
]

export default () => {
  return (
    <Space vertical>
      {maskList.map((item) => {
        return renderBox(...item)
      })}
    </Space>
  )
}
