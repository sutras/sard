import { useState } from 'react'
import { ActionSheet, ActionSheetItemProps, Cell, Toast } from 'sard-taro'

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
        cancel="取消"
        actionClosable
        onSelect={handleSelect}
        onClose={setVisible}
      >
        <ActionSheet.Item title="动作1" color="red" />
        <ActionSheet.Item title="动作2" disabled />
        <ActionSheet.Item title="动作3" loading />
      </ActionSheet>
    </>
  )
}
