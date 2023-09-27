import { useState } from 'react'
import { List, ShareSheet, ShareSheetItemProps, Toast } from 'sard-taro'

import { itemList } from './Basic'

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
        title="分享到"
        description="这是描述"
        cancel="取消"
        onSelect={handleSelect}
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
