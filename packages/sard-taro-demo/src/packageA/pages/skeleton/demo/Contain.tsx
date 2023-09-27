import { View } from '@tarojs/components'
import { useState } from 'react'
import { Icon, Skeleton, Space, Switch } from 'sard-taro'

export default () => {
  const [loading, setLoading] = useState(true)

  return (
    <Space>
      <Switch
        defaultChecked={!loading}
        onChange={(check) => setLoading(!check)}
      />

      <Skeleton avatar title animated loading={loading}>
        <Space direction="horizontal" gap={15}>
          <View style={{ flexGrow: 0 }}>
            <Icon name="person" size={32} />
          </View>
          <Space style={{ flex: 1 }}>
            <View style={{ fontSize: 16 }}>我是一个标题</View>
            <View>
              我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
            </View>
          </Space>
        </Space>
      </Skeleton>
    </Space>
  )
}
