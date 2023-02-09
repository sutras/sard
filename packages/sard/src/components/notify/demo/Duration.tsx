/*
### 自定义时长
*/

import { useState } from 'react'
import { Notify, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示不会消失的通知</Button>{' '}
      <Button onClick={() => setVisible(false)}>隐藏通知</Button>
      <Notify visible={visible} duration={0} message="这是一条通知" />
    </>
  )
}
