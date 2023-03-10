/*
### 结合 Cell 组件使用
*/

import { Popout, Calendar, Cell, Picker, DatetimePicker, Cascader } from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <Cell.Group>
      <Popout title="日历">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={value?.toString()}
              title="日历"
              isLink
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar />
        </Popout.Target>
      </Popout>

      <Popout title="级联选择">
        <Popout.Outlet>
          {({ value, triggerArgs: [, options = []], setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={
                (value?.length &&
                  options.map((option) => option.name).join('/')) ||
                ''
              }
              title="级联选择"
              isLink
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

      <Popout title="日期时间">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={value?.toLocaleString()}
              title="日期时间"
              isLink
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <DatetimePicker />
        </Popout.Target>
      </Popout>

      <Popout title="选择器">
        <Popout.Outlet>
          {({ value, triggerArgs: [, options = []], setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={
                value?.length && options.map((option: any) => option.label)
              }
              title="选择器"
              isLink
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Picker
            columns={[
              Array(10)
                .fill(0)
                .map((_, i) => ({ label: 'label' + (i + 1), value: i + 1 })),
            ]}
          />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
