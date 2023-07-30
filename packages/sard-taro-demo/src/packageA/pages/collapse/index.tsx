import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'
import { useState } from 'react'
import { Cell, Collapse } from 'sard-taro'
import { View } from '@tarojs/components'

export default () => {
  const [visible, setVisible] = useState(true)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <Page className="page-collapse">
      <Demo title="基础使用" full>
        <Cell.Group card style={{ marginBottom: 20 }}>
          <Cell linkable title="toggle" onClick={handleClick}></Cell>
        </Cell.Group>

        <Collapse visible={visible}>
          <View className="collapse-box">
            <View>collapse</View>
            <View>collapse</View>
            <View>collapse</View>
            <View>collapse</View>
            <View>collapse</View>
            <View>collapse</View>
            <View>collapse</View>
          </View>
        </Collapse>
      </Demo>
    </Page>
  )
}
