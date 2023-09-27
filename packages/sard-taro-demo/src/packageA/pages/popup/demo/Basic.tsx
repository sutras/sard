import { Text } from '@tarojs/components'
import { useState } from 'react'
import { List, Popup, PopupProps } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)
  const [effect, setEffect] = useState<PopupProps['effect']>('zoom')

  const show = (effect: PopupProps['effect']) => {
    setVisible(true)
    setEffect(effect)
  }

  const handleMaskClick = () => {
    setVisible(false)
  }

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="顶部划出"
          onClick={() => show('slide-top')}
        />
        <List.Item
          linkable
          title="右边划出"
          onClick={() => show('slide-right')}
        />
        <List.Item
          linkable
          title="底部划出"
          onClick={() => show('slide-bottom')}
        />
        <List.Item
          linkable
          title="左边划出"
          onClick={() => show('slide-left')}
        />
        <List.Item linkable title="缩放" onClick={() => show('zoom')} />
        <List.Item linkable title="淡入淡出" onClick={() => show('fade')} />
      </List>

      <Popup
        visible={visible}
        effect={effect}
        onMaskClick={handleMaskClick}
        contentStyle={{
          padding: 20,
          backgroundColor: 'white',
        }}
      >
        <Text>Popup</Text>
      </Popup>
    </>
  )
}
