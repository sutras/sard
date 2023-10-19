import { useState } from 'react'
import { ActionSheet, List, Toast } from 'sard'

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
        description="这是一段描述"
        visible={visible}
        onVisible={setVisible}
        onSelect={(index) => {
          Toast.show(index)
        }}
      >
        <ActionSheet.Item name="动作1" />
        <ActionSheet.Item name="动作2" description="当前动作的描述" />
        <ActionSheet.Item name="动作3" />
      </ActionSheet>
    </>
  )
}
