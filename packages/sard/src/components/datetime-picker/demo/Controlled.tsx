/*
### 受控
*/

import { useState } from 'react'
import { Button, DatetimePicker } from 'sard'

export default function () {
  const [value, setValue] = useState(new Date())

  return (
    <>
      <Button onClick={() => setValue(new Date())}>change to now</Button>
      <p>{value.toLocaleString()}</p>
      <DatetimePicker value={value} onChange={setValue} type="yMd" />
    </>
  )
}
