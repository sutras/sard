import { useState } from 'react'
import { Checkbox } from 'sard-taro'

export default () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      {checked ? '已选中' : '未选中'}
    </Checkbox>
  )
}
