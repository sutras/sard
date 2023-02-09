/*
### 受控
*/

import { Checkbox } from 'sard'
import { useState } from 'react'

export default function () {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      {checked ? '已选中' : '未选中'}
    </Checkbox>
  )
}
