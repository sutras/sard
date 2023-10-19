import { useState } from 'react'
import { List, Picker, PopoutInput } from 'sard'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  const [value, setValue] = useState<number[]>()

  return (
    <List card>
      <List.Item
        linkable
        title="设置为: 广东省/广州市/白云区"
        onClick={() => setValue([440000, 440100, 440111])}
      />
      <List.Item linkable title="清空" onClick={() => setValue(undefined)} />
      <List.Item>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Picker
            columns={regionData}
            optionKeys={{ label: 'name', value: 'code' }}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
