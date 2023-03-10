/*
### 快捷确认

添加 `fast` 属性可以在组件触发回调时快速确定，此时可以将确定按钮隐藏。
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <>
      <Popout title="请选择出生日期" fast showConfirm={false}>
        <Popout.Outlet>
          {({ value, setValue, setVisible }) => (
            <Input
              value={value || ''}
              readOnly
              placeholder="请选择日期"
              onClick={() => setVisible(true)}
              onClear={() => setValue(null)}
              clearable
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
