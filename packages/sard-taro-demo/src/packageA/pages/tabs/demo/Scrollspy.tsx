import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs
      scrollspy
      offset={-48 - 5}
      headerStyle={{
        position: 'sticky',
        top: 0,
        background: 'var(--sar-emphasis-bg)',
      }}
    >
      {Array(7)
        .fill(0)
        .map((_, i) => (
          <TabsPane key={i} label={`标签${i + 1}`}>
            <View className="demo-pane demo-pane-scrollspy">内容{i + 1}</View>
          </TabsPane>
        ))}
    </Tabs>
  )
}
