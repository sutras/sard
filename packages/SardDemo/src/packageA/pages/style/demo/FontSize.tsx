import { Space } from 'sard'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../index.scss'

function renderSize(className: string, text: string) {
  return (
    <View key={className} className={classNames('demo-size-box', className)}>
      {text}
    </View>
  )
}

const sizeList: [string, string][] = [
  ['demo-text-xs', 'xs 超小'],
  ['demo-text-sm', 'sm 小号'],
  ['demo-text-base', 'base 默认'],
  ['demo-text-lg', 'lg 大号'],
  ['demo-text-xl', 'xl 加大'],
  ['demo-text-2xl', '2xl 超大'],
]

export default () => {
  return (
    <Space align="center">
      {sizeList.map((item) => {
        return renderSize(...item)
      })}
    </Space>
  )
}
