import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs animated>
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
  )
}
