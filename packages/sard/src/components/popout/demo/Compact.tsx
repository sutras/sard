/*
### 紧凑类型

通过将 `type` 设为 `compact` 可以将确定/取消按钮放到标题两侧，以便节省空间。
*/

import { Popout, Button, Toast } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示弹出框</Button>
      <Popout
        visible={visible}
        title="标题"
        type="compact"
        onClose={setVisible}
        onConfirm={() => Toast.show('确定')}
        onCancel={() => Toast.show('取消')}
      >
        <div>弹出框内容</div>
        <div>弹出框内容</div>
        <div>弹出框内容</div>
      </Popout>
    </>
  )
}
