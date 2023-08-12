import { useState } from 'react'
import { Cell, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

import { itemList } from './Basic'

const itemList2: ShareSheetItemProps[][] = [
  itemList,
  [
    {
      name: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      icon: {
        prefix: 'demo-icon',
        name: 'spotify-fill',
      },
    },
    {
      name: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      icon: {
        prefix: 'demo-icon',
        name: 'skype-fill',
      },
    },
    {
      name: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      icon: {
        prefix: 'demo-icon',
        name: 'youtube-fill',
      },
    },
    {
      name: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      icon: {
        prefix: 'demo-icon',
        name: 'paypal-fill',
      },
    },
    {
      name: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      icon: {
        prefix: 'demo-icon',
        name: 'whatsapp-fill',
      },
    },
    {
      name: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      icon: {
        prefix: 'demo-icon',
        name: 'telegram-fill',
      },
    },
    {
      name: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      icon: {
        prefix: 'demo-icon',
        name: 'snapchat-fill',
      },
    },
  ],
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
        title="分享到"
        visible={visible}
        itemList={itemList2}
        cancel="取消"
        actionClosable
        onSelect={handleSelect}
        onClose={setVisible}
      />
    </>
  )
}
