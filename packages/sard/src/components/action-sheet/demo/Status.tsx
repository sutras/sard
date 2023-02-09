/*
### 状态
*/

import { ActionSheet, ActionSheetItemProps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList = [
    {
      title: '动作1',
      color: 'red',
    },
    {
      title: '动作2',
      disabled: true,
    },
    {
      title: '动作3',
      loading: true,
    },
  ]

  const handleSelect = (item: ActionSheetItemProps, index: number) => {
    console.log(item, index)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示动作面板</Button>
      <ActionSheet
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
