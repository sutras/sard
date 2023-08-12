import { useState } from 'react'
import { Cell, Picker, Popout } from 'sard-taro'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  const [popoutCascaderValue, setPopoutCascaderValue] = useState<number[]>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 广东省/广州市/天河区"
        onClick={() => setPopoutCascaderValue([440000, 440100, 440106])}
      />
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
          <Picker
            value={popoutCascaderValue}
            columns={regionData}
            optionKeys={{ label: 'name', value: 'code' }}
          />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
