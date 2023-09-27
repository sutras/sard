import { View } from '@tarojs/components'
import { CountDown, Space, Tag } from 'sard-taro'

export default () => {
  return (
    <CountDown time={1000 * 60 * 60 * 2} interval={93}>
      {(time) => (
        <Space direction="horizontal">
          <Tag theme="primary" size="large">
            {String(time.hours).padStart(2, '0')}
          </Tag>
          <View>:</View>
          <Tag theme="primary" size="large">
            {String(time.minutes).padStart(2, '0')}
          </Tag>
          <View>:</View>
          <Tag theme="primary" size="large">
            {String(time.seconds).padStart(2, '0')}
          </Tag>
        </Space>
      )}
    </CountDown>
  )
}
