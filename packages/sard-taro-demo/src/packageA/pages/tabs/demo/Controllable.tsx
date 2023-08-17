import { View } from '@tarojs/components'
import { useState } from 'react'
import { Button, Space, Tabs, TabsPane } from 'sard-taro'

export default () => {
  const [activeKey, setActiveKey] = useState<number | string>(1)

  return (
    <Space vertical>
      <View>
        <Button onClick={() => setActiveKey(2)}>切换到标签3</Button>
      </View>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
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
    </Space>
  )
}
