import { View } from '@tarojs/components'
import { useState } from 'react'
import { List, Popout, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="默认弹出框"
          onClick={() => setVisible(true)}
        />
        <List.Item
          linkable
          title="显示取消按钮"
          onClick={() => setVisible2(true)}
        />
      </List>

      <Popout
        title="标题"
        visible={visible}
        onVisible={setVisible}
        onConfirm={() => Toast.show('确定')}
        onCancel={() => Toast.show('取消')}
      >
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
        </View>
      </Popout>

      <Popout
        showCancel
        showClose={false}
        title="标题"
        visible={visible2}
        onVisible={setVisible2}
        onConfirm={() => Toast.show('确定')}
        onCancel={() => Toast.show('取消')}
      >
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
        </View>
      </Popout>
    </>
  )
}
