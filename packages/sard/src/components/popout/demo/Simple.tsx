/*
### 简化操作

使用 `PopoutOutlet` 输出值，使用 `PopoutTarget` 连接目标组件，
以便减少控制显隐、中间值等状态和回调的声明；
并且将输出组件和目标组件结合在 `Popout` 组件下，为搭配 `Form` 组件一起使用提供了便利。
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <>
      <Popout title="请选择出生日期">
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
