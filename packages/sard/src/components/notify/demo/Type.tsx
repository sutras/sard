/*
### 类型
*/

import { useState, useRef } from 'react'
import { Notify, NotifyProps, NotifyRef, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<NotifyProps['type']>()

  const showNotification = (type: NotifyProps['type']) => {
    setType(type)
    setVisible(true)
  }

  return (
    <>
      <Button onClick={() => showNotification('primary')}>主要通知</Button>{' '}
      <Button onClick={() => showNotification('success')}>成功通知</Button>{' '}
      <Button onClick={() => showNotification('warning')}>警告通知</Button>{' '}
      <Button onClick={() => showNotification('error')}>错误通知</Button>{' '}
      <Button onClick={() => setVisible(false)}>隐藏通知</Button>
      <Notify
        type={type}
        visible={visible}
        message="这是一条通知"
        onTimeout={setVisible}
      />
    </>
  )
}
