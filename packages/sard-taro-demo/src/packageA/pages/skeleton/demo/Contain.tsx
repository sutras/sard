import { View } from '@tarojs/components'
import { useState } from 'react'
import { Icon, Skeleton, Space, Switch } from 'sard-taro'

export default () => {
  const [loading, setLoading] = useState(true)

  return (
    <Space vertical>
      <Switch
        defaultChecked={!loading}
        onChange={(check) => setLoading(!check)}
      ></Switch>

      <Skeleton avatar title animated loading={loading}>
        <View style={{ display: 'flex' }}>
          <View style={{ flex: 'none', marginRight: 15 }}>
            <Icon name="person" size={32}></Icon>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, fontSize: 16 }}>我是一个标题</View>
            <View>
              我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
            </View>
          </View>
        </View>
      </Skeleton>
    </Space>
  )
}
