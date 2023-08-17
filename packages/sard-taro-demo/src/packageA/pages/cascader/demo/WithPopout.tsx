import { Cascader, Cell, PopoutInput } from 'sard-taro'
import { getRegionData } from 'region-data'
import { useState } from 'react'

const regionData = getRegionData()

export default () => {
  const [value, setValue] = useState<number>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为：广东省/广州市/白云区"
        onClick={() => setValue(440111)}
      />
      <Cell linkable title="清空" onClick={() => setValue(undefined)} />
      <Cell>
        <PopoutInput
          title="请选择省市区"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Cascader
            options={regionData}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
