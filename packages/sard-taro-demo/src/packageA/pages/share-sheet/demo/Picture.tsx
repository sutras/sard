import { useState } from 'react'
import { Cell, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

import pic1 from '@/static/pic1.jpg'

const itemList: ShareSheetItemProps[] = [
  {
    name: 'Sard',
    icon: pic1,
  },
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      prefix: 'demo-icon',
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
      <Cell.Group card>
        <Cell linkable title="显示分享面板" onClick={() => setVisible(true)} />
      </Cell.Group>

      <ShareSheet
        visible={visible}
        itemList={itemList}
        cancel="取消"
        actionClosable
        onSelect={handleSelect}
        onClose={setVisible}
      />
    </>
  )
}
