import { View } from '@tarojs/components'
import { useState } from 'react'
import { Swiper, Tabs } from 'sard'

import '../index.scss'

export default () => {
  const [swipeActiveKey, setSwipeActiveKey] = useState<number | string>(0)

  return (
    <>
      <Tabs activeKey={swipeActiveKey} onChange={setSwipeActiveKey}>
        <Tabs.Tab>标签1</Tabs.Tab>
        <Tabs.Tab>标签2</Tabs.Tab>
        <Tabs.Tab>标签3</Tabs.Tab>
      </Tabs>

      <Swiper
        duration={300}
        current={Number(swipeActiveKey)}
        onChange={(event) => {
          setSwipeActiveKey(event.detail.current)
        }}
      >
        <Swiper.Item>
          <View className="demo-tab-pane">内容1</View>
        </Swiper.Item>
        <Swiper.Item>
          <View className="demo-tab-pane">内容2</View>
        </Swiper.Item>
        <Swiper.Item>
          <View className="demo-tab-pane">内容3</View>
        </Swiper.Item>
      </Swiper>
    </>
  )
}
