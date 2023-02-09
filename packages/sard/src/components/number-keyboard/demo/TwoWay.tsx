/*
### 双向绑定
*/

import { NumberKeyboard, Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <Input
        value={value}
        readOnly
        onClick={() => setVisible(true)}
        placeholder="请输入验证码"
        clearable
        onClear={setValue}
      />

      <NumberKeyboard
        value={value}
        onChange={setValue}
        maxLength={6}
        visible={visible}
        onVisible={setVisible}
      />
    </>
  )
}
