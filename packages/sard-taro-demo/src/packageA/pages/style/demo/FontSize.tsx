import { Space } from 'sard-taro'
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
  ['sar-text-xs', 'xs 超小'],
  ['sar-text-sm', 'sm 小'],
  ['sar-text-base', 'base 默认'],
  ['sar-text-lg', 'lg 大'],
  ['sar-text-xl', 'xl 加大'],
  ['sar-text-2xl', '2xl 两个加'],
]

export default () => {
  return (
    <Space>
      {sizeList.map((item) => {
        return renderSize(...item)
      })}
    </Space>
  )
}
