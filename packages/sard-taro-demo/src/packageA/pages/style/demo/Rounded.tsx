import { Space } from 'sard-taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../index.scss'

function renderBox(className: string, text: string) {
  return (
    <View key={className} className={classNames('demo-rounded-box', className)}>
      {text}
    </View>
  )
}

const maskList: [string, string][] = [
  ['sar-rounded-xs', 'xs'],
  ['sar-rounded-sm', 'sm'],
  ['sar-rounded', 'md'],
  ['sar-rounded-lg', 'lg'],
  ['sar-rounded-xl', 'xl'],
  ['sar-rounded-full', 'full'],
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
