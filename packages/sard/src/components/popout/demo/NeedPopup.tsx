/*
### 结合日期组件

弹出框内部可以放置任何内容。
*/

import { Popout, Calendar, Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState<Date>()
  const [value, setValue] = useState('')

  return (
    <>
      <Input
        value={value}
        onChange={setValue}
        onClick={() => setVisible(true)}
        onClear={setValue}
        clearable
        readOnly
        placeholder="请选择日期"
      />

      <Popout
        title="请选择日期"
        visible={visible}
        onClose={setVisible}
        onConfirm={() => setValue(date.toString())}
      >
        <Calendar value={date} onChange={setDate} />
      </Popout>
    </>
  )
}
