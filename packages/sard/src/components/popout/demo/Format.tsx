/*
### 格式化输出
*/

import { Popout, Cascader, CascaderOption, Input } from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <>
      <Popout title="请选择省市区">
        <Popout.Target
          clear
          select
          value
          format={(_, options) =>
            options.map((item: CascaderOption) => item.name).join('/')
          }
        >
          <Input readOnly placeholder="请选择省市区" clearable />
        </Popout.Target>
        <Popout.Bridge>
          <Cascader
            options={area}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Popout.Bridge>
      </Popout>
    </>
  )
}
