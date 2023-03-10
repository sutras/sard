/*
### 配合弹出框使用
*/

import { Picker, PickerOption, Popout, Input } from 'sard'

export default function () {
  const columns = Array(1)
    .fill(0)
    .map((_, i) =>
      Array(10)
        .fill(0)
        .map((_, j) => ({
          value: `${i}-${j}`,
          label: `column${i}-item${j}`,
        })),
    )

  return (
    <>
      <Popout title="请选择">
        <Popout.Outlet>
          {({ value, setValue, triggerArgs: [, options = []], setVisible }) => (
            <Input
              value={
                (value?.length &&
                  options.map((option) => option.name).join('/')) ||
                ''
              }
              onClear={() => setValue()}
              onClick={() => setVisible(true)}
              clearable
              readOnly
              placeholder="请选择"
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Picker columns={columns} />
        </Popout.Target>
      </Popout>
    </>
  )
}
