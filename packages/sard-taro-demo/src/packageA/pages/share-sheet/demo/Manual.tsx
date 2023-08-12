import { useState } from 'react'
import { Cell, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

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
        cancel="取消"
        actionClosable
        onSelect={handleSelect}
        onClose={setVisible}
      >
        <ShareSheet.Row>
          <ShareSheet.Item
            name="Wechat"
            color="#fff"
            background="#0bc15f"
            icon={{
              prefix: 'demo-icon',
              name: 'wechat-fill',
            }}
          />
          <ShareSheet.Item
            name="Alipay"
            color="#fff"
            background="#1677ff"
            icon={{
              prefix: 'demo-icon',
              name: 'alipay-fill',
            }}
          />
        </ShareSheet.Row>
      </ShareSheet>
    </>
  )
}
