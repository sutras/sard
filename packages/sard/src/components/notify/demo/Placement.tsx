/*
### 自定义位置
*/

import { useState } from 'react'
import { Notify, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>在底部显示通知</Button>{' '}
      <Button onClick={() => setVisible(false)}>隐藏通知</Button>
      <Notify
        visible={visible}
        message="这是一条通知"
        popupProps={{ placement: 'bottom' }}
        onTimeout={setVisible}
      />
    </>
  )
}
