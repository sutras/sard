/*
### 多行
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
    [
      {
        name: 'Wechat',
        color: '#fff',
        background: '#0bc15f',
        icon: {
          name: 'bi-wechat',
        },
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
    ],
    [
      {
        name: 'Spotify',
        color: '#fff',
        background: '#1ed760',
        icon: {
          name: 'bi-spotify',
        },
      },
      {
        name: 'Tiktok',
        color: '#fff',
        background: '#000',
        icon: {
          name: 'bi-tiktok',
        },
      },
      {
        name: 'Skype',
        color: '#fff',
        background: '#0b64a4',
        icon: {
          name: 'bi-skype',
        },
      },
      {
        name: 'Youtube',
        color: '#fff',
        background: '#ff0000',
        icon: {
          name: 'bi-youtube',
        },
      },
      {
        name: 'Paypal',
        color: '#fff',
        background: '#0070ba',
        icon: {
          name: 'bi-paypal',
        },
      },
      {
        name: 'Whatsapp',
        color: '#fff',
        background: '#128c7e',
        icon: {
          name: 'bi-whatsapp',
        },
      },
      {
        name: 'Telegram',
        color: '#fff',
        background: '#0088cc',
        icon: {
          name: 'bi-telegram',
        },
      },
      {
        name: 'Snapchat',
        color: '#000',
        background: '#fffc00',
        icon: {
          name: 'bi-snapchat',
        },
      },
    ],
  ]

  const handleSelect = (item: ShareSheetItemProps) => {
    Toast.show(item.name)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示分享面板</Button>
      <ShareSheet
        title="分享到"
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
