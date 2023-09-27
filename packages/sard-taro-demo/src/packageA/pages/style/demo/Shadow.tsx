import { Space } from 'sard-taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../index.scss'

function renderBox(className: string, text: string) {
  return (
    <View key={className} className={classNames('demo-shadow-box', className)}>
      {text}
    </View>
  )
}

const shadowList: [string, string][] = [
  ['sar-shadow-sm', 'sm 小'],
  ['sar-shadow', '默认'],
  ['sar-shadow-lg', 'lg 大'],
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
