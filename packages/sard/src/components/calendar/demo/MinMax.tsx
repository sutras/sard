/*
### 自定义日期范围
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Outlet>
        {({ value, setValue, setVisible }) => (
          <Input
            value={value || ''}
            onClear={() => setValue()}
            clearable
            onClick={() => setVisible(true)}
            readOnly
            placeholder="请选择日期"
          />
        )}
      </Popout.Outlet>
      <Popout.Target>
        <Calendar min={new Date(2022, 7, 25)} max={new Date(2022, 8, 28)} />
      </Popout.Target>
    </Popout>
  )
}
