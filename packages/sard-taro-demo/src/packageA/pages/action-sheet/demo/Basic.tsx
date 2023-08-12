import { useState } from 'react'
import { ActionSheet, ActionSheetItemProps, Cell, Toast } from 'sard-taro'

const itemList = [
  {
    title: '动作1',
  },
  {
    title: '动作2',
    label: '这是一个描述',
  },
  {
    title: '动作3',
  },
]

export default () => {
  const [visible, setVisible] = useState(false)

  const handleSelect = (item: ActionSheetItemProps, index: number) => {
    Toast.show(JSON.stringify(item) + `, 下标：${index}`)
  }

  return (
    <>
      <Cell.Group card>
        <Cell linkable title="显示动作面板" onClick={() => setVisible(true)} />
      </Cell.Group>

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
