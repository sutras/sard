import { View } from '@tarojs/components'
import { useState } from 'react'
import { List, Popout, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="显示弹出框"
          onClick={() => setVisible(true)}
        />
      </List>
      <Popout
        type="compact"
        title="标题"
        visible={visible}
        onVisible={setVisible}
        onConfirm={() => Toast.show('确定')}
        onCancel={() => Toast.show('取消')}
      >
        <View style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
        </View>
      </Popout>
    </>
  )
}
