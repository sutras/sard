import { Text, View } from '@tarojs/components'
import { Badge, Icon, Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs>
      <TabsPane label="标签1">
        <View className="demo-pane">内容1</View>
      </TabsPane>
      <TabsPane
        label={(active) => (
          <View>
            <Icon prefix="demo-icon" name={active ? 'heart-fill' : 'heart'} />
            <Text style={{ marginLeft: 5 }}>标签1</Text>
          </View>
        )}
      >
        <View className="demo-pane">内容2</View>
      </TabsPane>
      <TabsPane label={<Badge value={2}>标签3</Badge>}>
        <View className="demo-pane">内容3</View>
      </TabsPane>
    </Tabs>
  )
}
