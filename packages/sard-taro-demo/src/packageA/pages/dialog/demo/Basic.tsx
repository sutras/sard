import { useState } from 'react'
import { Cell, Dialog } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  return (
    <>
      <Cell.Group card>
        <Cell linkable title="显示提示框" onClick={() => setVisible(true)} />
        <Cell linkable title="显示确认框" onClick={() => setVisible2(true)} />
      </Cell.Group>

      <Dialog
        visible={visible}
        title="提示"
        message="此功能暂时无法使用"
        onVisible={setVisible}
      ></Dialog>

      <Dialog
        visible={visible2}
        title="提示"
        message="此功能暂时无法使用"
        onVisible={setVisible2}
        showCancel
      ></Dialog>
    </>
  )
}
