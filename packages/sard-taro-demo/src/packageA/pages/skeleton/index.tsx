import Demo from '@/components/demo'
import Page from '@/components/page'
import { useState } from 'react'
import { View } from '@tarojs/components'
import { Icon, Skeleton, Switch } from 'sard-taro'

import './index.scss'

export default () => {
  const [loading, setLoading] = useState(true)

  return (
    <Page className="page-skeleton">
      <Demo title="基础使用">
        <Skeleton />
      </Demo>

      <Demo title="显示标题">
        <Skeleton title />
      </Demo>

      <Demo title="显示头像">
        <Skeleton avatar title />
      </Demo>

      <Demo title="圆形头像">
        <Skeleton avatar avatarRound title />
      </Demo>

      <Demo title="圆角标题和段落">
        <Skeleton avatar title round />
      </Demo>

      <Demo title="动画效果">
        <Skeleton avatar title animated />
      </Demo>

      <Demo title="包含子组件">
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
              <View style={{ marginBottom: 10, fontSize: '1.2em' }}>
                我是一个标题
              </View>
              <View>
                我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
              </View>
            </View>
          </View>
        </Skeleton>
      </Demo>

      <Demo title="自定义">
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}
        >
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <View
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Skeleton.Avatar size={48} animated />
                <Skeleton.Block animated />
              </View>
            ))}
        </View>

        <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <Skeleton.Block style={{ width: 100, height: 80 }} animated />
          <View style={{ flex: 1 }}>
            <Skeleton.Paragraph rows={2} animated />
            <Skeleton.Block
              style={{ width: 60, height: 30, marginLeft: 'auto' }}
              animated
            />
          </View>
        </View>
      </Demo>
    </Page>
  )
}
