/*
### 配合弹出框使用
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Outlet>
        {({ value, setValue, setVisible }) => (
          <Input
            value={value || ''}
            clearable
            onClear={() => setValue()}
            onClick={() => setVisible(true)}
            readOnly
            placeholder="请选择日期"
          />
        )}
      </Popout.Outlet>
      <Popout.Target>
        <Calendar />
      </Popout.Target>
    </Popout>
  )
}
