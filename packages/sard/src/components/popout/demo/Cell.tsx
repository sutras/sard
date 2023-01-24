/*
### 结合 Cell 组件使用
*/

import {
  Popout,
  Calendar,
  Cell,
  Picker,
  DatetimePicker,
  Cascader,
  CascaderOption,
} from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <Cell.Group>
      <Popout title="日历">
        <Popout.Target select value>
          <Cell title="日历" isLink />
        </Popout.Target>
        <Popout.Bridge>
          <Calendar />
        </Popout.Bridge>
      </Popout>

      <Popout title="级联选择">
        <Popout.Target
          select
          value
          format={(_, options) =>
            options.map((item: CascaderOption) => item.name).join('/')
          }
        >
          <Cell title="级联选择" isLink />
        </Popout.Target>
        <Popout.Bridge>
          <Cascader
            options={area}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Popout.Bridge>
      </Popout>

      <Popout title="日期时间">
        <Popout.Target select value format={(date) => date.toLocaleString()}>
          <Cell title="日期时间" isLink />
        </Popout.Target>
        <Popout.Bridge>
          <DatetimePicker />
        </Popout.Bridge>
      </Popout>

      <Popout title="选择器">
        <Popout.Target
          select
          value
          format={(_, options) => options.map((option: any) => option.label)}
        >
          <Cell title="选择器" isLink />
        </Popout.Target>
        <Popout.Bridge>
          <Picker
            columns={[
              Array(10)
                .fill(0)
                .map((_, i) => ({ label: 'label' + (i + 1), value: i + 1 })),
            ]}
          />
        </Popout.Bridge>
      </Popout>
    </Cell.Group>
  )
}
