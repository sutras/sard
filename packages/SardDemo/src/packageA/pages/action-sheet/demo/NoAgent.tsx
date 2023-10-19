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
        visible={visible}
        onVisible={setVisible}
        itemList={['动作1', '动作2', '动作3']}
        onSelect={(index) => {
          Toast.show(index)
        }}
      />
    </>
  )
}
