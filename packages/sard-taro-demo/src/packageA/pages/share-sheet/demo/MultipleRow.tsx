import { useState } from 'react'
import { List, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

import { itemList } from './Basic'

const itemList2: ShareSheetItemProps[][] = [
  itemList,
  [
    {
      name: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      icon: {
        family: 'demo-icons',
        name: 'spotify-fill',
      },
    },
    {
      name: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      icon: {
        family: 'demo-icons',
        name: 'skype-fill',
      },
    },
    {
      name: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      icon: {
        family: 'demo-icons',
        name: 'youtube-fill',
      },
    },
    {
      name: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      icon: {
        family: 'demo-icons',
        name: 'paypal-fill',
      },
    },
    {
      name: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      icon: {
        family: 'demo-icons',
        name: 'whatsapp-fill',
      },
    },
    {
      name: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      icon: {
        family: 'demo-icons',
        name: 'telegram-fill',
      },
    },
    {
      name: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      icon: {
        family: 'demo-icons',
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
      <List card>
        <List.Item
          linkable
          title="显示分享面板"
          onClick={() => setVisible(true)}
        />
      </List>

      <ShareSheet
        itemList={itemList2}
        cancel="取消"
        onSelect={handleSelect}
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
