import { Cascader, Cell, Popout } from 'sard-taro'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择省市区">
        <Popout.Outlet>
          {({ triggerArgs: [, options = []], setVisible }) => (
            <Cell
              linkable
              title="请选择省市区"
              value={options.map((option) => option.name).join('/')}
              onClick={() => setVisible(true)}
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Cascader
            defaultValue={440111}
            options={regionData}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
