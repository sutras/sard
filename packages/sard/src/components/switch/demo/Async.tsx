/*
### 异步控制
*/

import { Switch } from 'sard'
import { useState } from 'react'

export default function () {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChange = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setChecked(checked)
      setLoading(false)
    }, 500)
  }
  return (
    <>
      <Switch
        checked={checked}
        loading={loading}
        onChange={handleChange}
        checkedValue="on"
        uncheckedValue="off"
      />
    </>
  )
}
