import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs>
      <TabsPane key="key1" label="标签1">
        <View className="demo-pane">内容1</View>
      </TabsPane>
      <TabsPane key="key2" label="标签2">
        <View className="demo-pane">内容2</View>
      </TabsPane>
      <TabsPane key="key3" label="标签3">
        <View className="demo-pane">内容3</View>
      </TabsPane>
    </Tabs>
  )
}
