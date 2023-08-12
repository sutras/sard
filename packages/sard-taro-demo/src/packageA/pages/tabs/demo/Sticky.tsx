import { View } from '@tarojs/components'
import { Tabs, TabsPane } from 'sard-taro'

export default () => {
  return (
    <Tabs
      headerStyle={{
        position: 'sticky',
        top: 0,
        background: 'var(--sar-emphasis-bg)',
      }}
    >
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <TabsPane key={i} label={`标签${i + 1}`}>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <View key={index} className="demo-pane">
                  内容 {i + 1}-{index + 1}
                </View>
              ))}
          </TabsPane>
        ))}
    </Tabs>
  )
}
