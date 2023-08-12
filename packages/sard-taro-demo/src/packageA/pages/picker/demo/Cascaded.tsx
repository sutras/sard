import { useState } from 'react'
import { Cell, Picker, Toast } from 'sard-taro'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  const [cascaderValue, setCascaderValue] = useState<(number | string)[]>()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 广东省/广州市/天河区"
        onClick={() => setCascaderValue([440000, 440100, 440106])}
      />
      <Cell>
        <Picker
          value={cascaderValue}
          columns={regionData}
          optionKeys={{ label: 'name', value: 'code' }}
          onChange={(value, ...restArgs) => {
            setCascaderValue(value)
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
