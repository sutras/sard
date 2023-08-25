import { Space } from 'sard-taro'
import { View } from '@tarojs/components'

import '../index.scss'

export function renderBox(value: string) {
  return (
    <View
      key={value}
      className="demo-gray-box"
      style={{ backgroundColor: value }}
    />
  )
}

const grayList = [
  'var(--sar-gray-900)',
  'var(--sar-gray-800)',
  'var(--sar-gray-700)',
  'var(--sar-gray-600)',
  'var(--sar-gray-500)',
  'var(--sar-gray-400)',
  'var(--sar-gray-300)',
  'var(--sar-gray-200)',
  'var(--sar-gray-100)',
]

export default () => {
  return (
    <Space gap={0}>
      {grayList.map((item) => {
        return renderBox(item)
      })}
    </Space>
  )
}
