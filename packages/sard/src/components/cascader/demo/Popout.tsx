/*
### 配合弹出框使用
*/

import { Cascader, CascaderOption, Popout, Input } from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <>
      <Popout title="请选择省市区">
        <Popout.Target
          select
          value
          clear
          format={(_, options: CascaderOption[]) =>
            options.map((option) => option.name).join('/')
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
