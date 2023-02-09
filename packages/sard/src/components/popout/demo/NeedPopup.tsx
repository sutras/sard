/*
### 结合日期组件
*/

import { Popout, Calendar, Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState('')
  const [value, setValue] = useState('')

  return (
    <>
      <Input
        readOnly
        placeholder="请选择日期"
        value={value}
        onChange={setValue}
        clearable
        onClick={() => setVisible(true)}
        onClear={setValue}
      />

      <Popout
        title="请选择日期"
        type="loose"
        visible={visible}
        onClose={setVisible}
        onConfirm={() => setValue(date)}
      >
        <Calendar value={date} onChange={setDate} />
      </Popout>
    </>
  )
}
