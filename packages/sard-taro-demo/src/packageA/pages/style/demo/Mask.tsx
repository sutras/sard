import { Space } from 'sard-taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../index.scss'

function renderBox(className: string, text: string) {
  return (
    <View key={className} className="demo-mask-container">
      <View>背景文字</View>
      <View className={classNames('demo-mask-box', className)}>{text}</View>
    </View>
  )
}

const maskList: [string, string][] = [
  ['sar-mask-legible', '黑色-浅色遮罩'],
  ['sar-mask-default', '黑色-默认遮罩'],
  ['sar-mask-illegible', '黑色-深色遮罩'],
  ['sar-mask-white-legible', '白色-浅色遮罩'],
  ['sar-mask-white', '白色-默认遮罩'],
  ['sar-mask-white-illegible', '白色-深色遮罩'],
]

export default () => {
  return (
    <Space>
      {maskList.map((item) => {
        return renderBox(...item)
      })}
    </Space>
  )
}
