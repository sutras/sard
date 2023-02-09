/*
### 标题
*/

import { NumberKeyboard, Button, Icon } from 'sard'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>弹出键盘</Button>
      <NumberKeyboard
        title={
          <>
            <Icon name="bi-shield-lock-fill"></Icon>
            <span style={{ marginLeft: 5, verticalAlign: 'middle' }}>
              安全键盘
            </span>
          </>
        }
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
