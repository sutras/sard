import { useState } from 'react'
import { View } from '@tarojs/components'
import { Cell, Collapse, Space } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(true)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <Space vertical>
      <Cell.Group card style={{ marginBottom: 20 }}>
        <Cell linkable title="toggle" onClick={handleClick}></Cell>
      </Cell.Group>

      <Collapse visible={visible}>
        <View
          style={{
            backgroundColor: 'var(--sar-secondary-bg)',
            padding: 10,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <View>collapse</View>
          <View>collapse</View>
          <View>collapse</View>
          <View>collapse</View>
          <View>collapse</View>
          <View>collapse</View>
          <View>collapse</View>
        </View>
      </Collapse>
    </Space>
  )
}
