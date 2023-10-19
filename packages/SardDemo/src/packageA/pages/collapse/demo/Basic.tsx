import { useState } from 'react'
import { View } from '@tarojs/components'
import { List, Collapse, Space } from 'sard'

export default () => {
  const [visible, setVisible] = useState(true)

  return (
    <Space gap="medium">
      <List card>
        <List.Item
          linkable
          title="toggle"
          onClick={() => setVisible(!visible)}
        />
      </List>

      <Collapse visible={visible}>
        <View
          style={{
            padding: 10,
            color: 'white',
            backgroundColor: 'tomato',
          }}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <View key={i}>collapse</View>
            ))}
        </View>
      </Collapse>
    </Space>
  )
}
