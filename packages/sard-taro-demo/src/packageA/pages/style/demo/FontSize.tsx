import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

function renderSize(value: string, text: string) {
  return (
    <View key={value} className="demo-size-box" style={{ fontSize: value }}>
      {text}
    </View>
  )
}

const sizeList: [string, string][] = [
  ['var(--sar-text-xs)', 'xs 超小'],
  ['var(--sar-text-sm)', 'sm 小'],
  ['var(--sar-text-base)', 'base 默认'],
  ['var(--sar-text-lg)', 'lg 大'],
  ['var(--sar-text-xl)', 'xl 加大'],
  ['var(--sar-text-2xl)', '2xl 两个加'],
]

export default () => {
  return (
    <Space vertical>
      {sizeList.map((item) => {
        return renderSize(...item)
      })}
    </Space>
  )
}
