import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs>
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
      <TabsPane label="标签7">
        <View className="demo-pane">内容7</View>
      </TabsPane>
    </Tabs>
  )
}
