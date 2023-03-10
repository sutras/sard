/*
### 配合弹出框使用
*/

import { Cascader, Popout, Input } from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <>
      <Popout title="请选择省市区">
        <Popout.Outlet>
          {({ value, triggerArgs: [, options = []], setVisible, setValue }) => (
            <Input
              value={
                (value?.length &&
                  options.map((option) => option.name).join('/')) ||
                ''
              }
              onClear={() => setValue()}
              clearable
              onClick={() => setVisible(true)}
              readOnly
              placeholder="请选择省市区"
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Cascader
            options={area}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Popout.Target>
      </Popout>
    </>
  )
}
