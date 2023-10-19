import { useState } from 'react'
import { List, ShareSheet, ShareSheetItemProps, Toast } from 'sard'

const itemList: ShareSheetItemProps[] = [
  {
    name: 'Sard',
    icon: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
  },
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      family: 'demo-icons',
      name: 'wechat-fill',
    },
  },
]

export default () => {
  const [visible, setVisible] = useState(false)

  const handleSelect = (item: ShareSheetItemProps) => {
    Toast.show(item.name)
  }

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="显示分享面板"
          onClick={() => setVisible(true)}
        />
      </List>

      <ShareSheet
        itemList={itemList}
        cancel="取消"
        onSelect={handleSelect}
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
