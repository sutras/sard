import { useState } from 'react'
import { Cell, Notify } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell.Group card>
        <Cell linkable title="显示通知" onClick={() => setVisible(true)} />
        <Cell linkable title="隐藏通知" onClick={() => setVisible(false)} />
      </Cell.Group>
      <Notify visible={visible} message="这是一条通知" onTimeout={setVisible} />
    </>
  )
}
