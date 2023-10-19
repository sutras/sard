import { Space } from 'sard'
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
  ['demo-rounded-xs', 'xs'],
  ['demo-rounded-sm', 'sm'],
  ['demo-rounded', 'md'],
  ['demo-rounded-lg', 'lg'],
  ['demo-rounded-xl', 'xl'],
  ['demo-rounded-full', 'full'],
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
