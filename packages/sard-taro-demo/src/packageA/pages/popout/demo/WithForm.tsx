import {
  Calendar,
  Cascader,
  Cell,
  DatetimePicker,
  Picker,
  Popout,
} from 'sard-taro'

import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  return (
    <Cell.Group card>
      <Popout title="日历">
        <Popout.Outlet>
          {({ outletValue, setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={outletValue}
              title="日历"
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar />
        </Popout.Target>
      </Popout>

      <Popout title="级联选择">
        <Popout.Outlet>
          {({ outletValue, setVisible }) => (
            <Cell
              value={outletValue}
              onClick={() => setVisible(true)}
              title="级联选择"
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Cascader
            options={regionData}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Popout.Target>
      </Popout>

      <Popout title="日期时间">
        <Popout.Outlet>
          {({ outletValue, setVisible }) => (
            <Cell
              value={outletValue}
              onClick={() => setVisible(true)}
              title="日期时间"
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <DatetimePicker />
        </Popout.Target>
      </Popout>

      <Popout title="选择器">
        <Popout.Outlet>
          {({ outletValue, setVisible }) => (
            <Cell
              value={outletValue}
              onClick={() => setVisible(true)}
              title="选择器"
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Picker
            columns={Array(5)
              .fill(0)
              .map((_, i) => `选项${i}`)}
          />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
