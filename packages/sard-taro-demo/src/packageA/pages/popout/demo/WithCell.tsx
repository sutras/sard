import { Calendar, Cascader, Cell, DatetimePicker, Popout } from 'sard-taro'

import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  return (
    <Cell.Group card>
      <Popout title="日历">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={value?.toLocaleDateString()}
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
          {({ triggerArgs: [, options = []], setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={options.map((option) => option.name).join('/')}
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
          {({ value, setVisible }) => (
            <Cell
              onClick={() => setVisible(true)}
              value={value?.toLocaleString()}
              title="日期时间"
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <DatetimePicker />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
