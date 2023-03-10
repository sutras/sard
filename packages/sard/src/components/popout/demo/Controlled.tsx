/*
### 受控的弹出框

弹出框代理了目标组件的值及变化的回调，可以设置初始值，或将其变为受控组件。
*/

import { useState } from 'react'
import { Popout, Calendar, Input } from 'sard'

export default function () {
  const [value, setValue] = useState<Date>(new Date())

  const handleChange = (value: Date) => {
    setValue(value)
  }

  return (
    <>
      <Popout title="请选择出生日期" value={value} onChange={handleChange}>
        <Popout.Outlet>
          {({ value, setValue, setVisible }) => (
            <Input
              value={value || ''}
              onClick={() => setVisible(true)}
              onClear={() => setValue(null)}
              clearable
              readOnly
              placeholder="请选择日期"
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar />
        </Popout.Target>
      </Popout>
    </>
  )
}
