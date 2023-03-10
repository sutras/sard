/*
### 范围选择
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Outlet>
        {({ value, setValue, setVisible }) => (
          <Input
            value={value?.join(', ')}
            onClear={() => setValue([])}
            clearable
            onClick={() => setVisible(true)}
            readOnly
            placeholder="请选择日期"
          />
        )}
      </Popout.Outlet>
      <Popout.Target>
        <Calendar type="range" />
      </Popout.Target>
    </Popout>
  )
}
