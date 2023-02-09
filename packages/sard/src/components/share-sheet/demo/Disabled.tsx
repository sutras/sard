/*
### 禁用
*/

import {
  ShareSheet,
  ShareSheetItemProps,
  ShareSheetItemList,
  Toast,
  Button,
} from 'sard'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList: ShareSheetItemList = [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        name: 'bi-wechat',
      },
      disabled: true,
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      icon: {
        name: 'bi-alipay',
      },
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      icon: {
        name: 'bi-twitter',
      },
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      icon: {
        name: 'bi-facebook',
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
