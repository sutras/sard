/*
### 简化键盘弹出
*/

import { NumberKeyboard, Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <NumberKeyboard value={value} onChange={setValue} maxLength={6}>
        <Input
          value={value}
          readOnly
          placeholder="请输入验证码"
          clearable
          onClear={setValue}
        />
      </NumberKeyboard>
    </>
  )
}
