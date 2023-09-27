import { useState } from 'react'
import { ActionSheet, List, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="显示动作面板"
          onClick={() => setVisible(true)}
        />
      </List>

      <ActionSheet
        visible={visible}
        onVisible={setVisible}
        cancel="取消"
        onSelect={(index) => {
          Toast.show(index)
        }}
      >
        <ActionSheet.Item name="动作1" />
        <ActionSheet.Item name="动作2" />
        <ActionSheet.Item name="动作3" />
      </ActionSheet>
    </>
  )
}
