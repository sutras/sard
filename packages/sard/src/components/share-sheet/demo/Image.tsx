/*
### 图片类型图标
*/

import {
  ShareSheet,
  ShareSheetItemProps,
  ShareSheetItemList,
  Toast,
  Button,
} from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList: ShareSheetItemList = [
    {
      name: 'Instagram',
      icon: new URL('../../../../public/logo.svg', import.meta.url).href,
    },
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        name: 'bi-wechat',
      },
    },
  ]

  const handleSelect = (item: ShareSheetItemProps) => {
    Toast.text(item.name)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示分享面板</Button>
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
