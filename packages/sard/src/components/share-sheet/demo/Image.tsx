/*
### 图片 Icon
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
      title: 'Instagram',
      icon: {
        type: 'default',
        size: '48px',
        name: new URL('../../../../public/logo.svg', import.meta.url).href,
      },
    },
    {
      title: 'Wechat',
      icon: {
        fullName: 'bi-wechat',
        frameColor: '#0bc15f',
      },
    },
  ]

  const handleSelect = (item: ShareSheetItemProps) => {
    setVisible(false)
    Toast.text(item.title as string)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示分享面板</Button>
      <ShareSheet
        visible={visible}
        itemList={itemList}
        cancel="取消"
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  )
}
