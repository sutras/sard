import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs
      direction="vertical"
      scrollspy
      headerStyle={{
        position: 'sticky',
        top: 0,
        background: 'var(--sar-emphasis-bg)',
        maxHeight: '100vh',
      }}
    >
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <TabsPane key={i} label={`标签${i + 1}`}>
            <View className="demo-pane demo-pane-vertical-scrollspy">
              内容{i + 1}
            </View>
          </TabsPane>
        ))}
    </Tabs>
  )
}
