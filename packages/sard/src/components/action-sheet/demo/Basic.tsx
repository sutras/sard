/*
### 基础使用
*/

import { ActionSheet, ActionSheetItemProps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList = [
    {
      title: '动作1',
    },
    {
      title: '动作2',
    },
    {
      title: '动作3',
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
        actionClosable
        onSelect={handleSelect}
        onClose={setVisible}
      />
    </>
  )
}
