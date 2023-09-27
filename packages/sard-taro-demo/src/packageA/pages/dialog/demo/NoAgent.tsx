import { useState } from 'react'
import { List, Dialog } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="显示提示框"
          onClick={() => setVisible(true)}
        />
      </List>

      <Dialog
        title="山坡羊·潼关怀古"
        message="峰峦如聚，波涛如怒，山河表里潼关路。望西都，意踌躇。"
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
