import { useState } from 'react'
import { List, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

export const itemList: ShareSheetItemProps[] = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      family: 'demo-icons',
      name: 'wechat-fill',
    },
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: {
      family: 'demo-icons',
      name: 'alipay-fill',
    },
  },
  {
    name: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    icon: {
      family: 'demo-icons',
      name: 'twitter-fill',
    },
  },
  {
    name: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    icon: {
      family: 'demo-icons',
      name: 'facebook-circle-fill',
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
