/*
### 可滑动的
*/

import { Cascader, CascaderOption, Popout, Input } from 'sard'
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
              clearable
              onClear={() => setValue()}
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
            tabsProps={{ swipeable: true }}
          />
        </Popout.Target>
      </Popout>
    </>
  )
}
