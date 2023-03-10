/*
### 选择多个日期
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Outlet>
        {({ value, setValue, setVisible }) => (
          <Input
            type="textarea"
            value={value?.join(', ')}
            onClear={() => setValue([])}
            clearable
            onClick={() => setVisible(true)}
            autoHeight
            readOnly
            placeholder="请选择日期"
          />
        )}
      </Popout.Outlet>
      <Popout.Target>
        <Calendar
          type="multiple"
          defaultValue={[new Date(2022, 8, 25), new Date(2022, 8, 28)]}
        />
      </Popout.Target>
    </Popout>
  )
}
