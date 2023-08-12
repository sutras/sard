import { useState } from 'react'
import { Cell, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

export const itemList: ShareSheetItemProps[] = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      prefix: 'demo-icon',
      name: 'wechat-fill',
    },
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: {
      prefix: 'demo-icon',
      name: 'alipay-fill',
    },
  },
  {
    name: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    icon: {
      prefix: 'demo-icon',
      name: 'twitter-fill',
    },
  },
  {
    name: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    icon: {
      prefix: 'demo-icon',
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
