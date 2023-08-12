import { View } from '@tarojs/components'
import { useState } from 'react'
import { Cell, Popout, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell.Group card>
        <Cell linkable title="显示弹出框" onClick={() => setVisible(true)} />
      </Cell.Group>

      <Popout
        visible={visible}
        title="标题"
        onClose={setVisible}
        onConfirm={() => Toast.show('确定')}
        onCancel={() => Toast.show('取消')}
      >
        <View>弹出框内容</View>
        <View>弹出框内容</View>
        <View>弹出框内容</View>
      </Popout>
    </>
  )
}
