import { View } from '@tarojs/components'
import { Space, Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Tabs
        headerStyle={{ borderBottom: '1px solid var(--sar-border-color)' }}
        activeLabelStyle={{ color: 'var(--sar-pink)' }}
        lineStyle={{ background: 'var(--sar-pink)' }}
      >
        <TabsPane label="标签1">
          <View className="demo-pane">内容1</View>
        </TabsPane>
        <TabsPane label="标签2">
          <View className="demo-pane">内容2</View>
        </TabsPane>
        <TabsPane label="标签3">
          <View className="demo-pane">内容3</View>
        </TabsPane>
      </Tabs>

      <Tabs
        type="border"
        labelStyle={{
          color: 'var(--sar-pink)',
          borderColor: 'var(--sar-pink)',
        }}
        activeLabelStyle={{ color: '#fff', background: 'var(--sar-pink)' }}
      >
        <TabsPane label="标签1">
          <View className="demo-pane">内容1</View>
        </TabsPane>
        <TabsPane label="标签2">
          <View className="demo-pane">内容2</View>
        </TabsPane>
        <TabsPane label="标签3">
          <View className="demo-pane">内容3</View>
        </TabsPane>
      </Tabs>

      <Tabs
        type="pill"
        activeLabelStyle={{ backgroundColor: 'var(--sar-pink)' }}
      >
        <TabsPane label="标签1">
          <View className="demo-pane">内容1</View>
        </TabsPane>
        <TabsPane label="标签2">
          <View className="demo-pane">内容2</View>
        </TabsPane>
        <TabsPane label="标签3">
          <View className="demo-pane">内容3</View>
        </TabsPane>
        <TabsPane label="标签4">
          <View className="demo-pane">内容4</View>
        </TabsPane>
        <TabsPane label="标签5">
          <View className="demo-pane">内容5</View>
        </TabsPane>
        <TabsPane label="标签6">
          <View className="demo-pane">内容6</View>
        </TabsPane>
      </Tabs>
    </Space>
  )
}
