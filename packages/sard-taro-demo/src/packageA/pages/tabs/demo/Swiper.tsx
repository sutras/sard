import { View } from '@tarojs/components'
import { useState } from 'react'
import { Swiper, Tabs, TabsPane } from 'sard-taro'

export default () => {
  const [swipeActiveKey, setSwipeActiveKey] = useState<number | string>(0)

  return (
    <>
      <Tabs activeKey={swipeActiveKey} onChange={setSwipeActiveKey}>
        <TabsPane label="标签1" />
        <TabsPane label="标签2" />
        <TabsPane label="标签3" />
      </Tabs>

      <Swiper
        duration={300}
        current={Number(swipeActiveKey)}
        onChange={(event) => {
          setSwipeActiveKey(event.detail.current)
        }}
      >
        <Swiper.Item>
          <View className="demo-pane">内容1</View>
        </Swiper.Item>
        <Swiper.Item>
          <View className="demo-pane">内容2</View>
        </Swiper.Item>
        <Swiper.Item>
          <View className="demo-pane">内容3</View>
        </Swiper.Item>
      </Swiper>
    </>
  )
}
