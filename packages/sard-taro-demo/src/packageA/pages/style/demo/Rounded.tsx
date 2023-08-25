import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

function renderBox(value: string, text: string) {
  return (
    <View
      key={value}
      className="demo-rounded-box"
      style={{ borderRadius: value }}
    >
      {text}
    </View>
  )
}

const maskList: [string, string][] = [
  ['var(--sar-rounded-xs)', 'xs'],
  ['var(--sar-rounded-sm)', 'sm'],
  ['var(--sar-rounded)', 'md'],
  ['var(--sar-rounded-lg)', 'lg'],
  ['var(--sar-rounded-xl)', 'xl'],
  ['var(--sar-rounded-full)', 'full'],
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
