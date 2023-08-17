import { useState } from 'react'
import { Cell, Picker, PopoutInput } from 'sard-taro'

export default () => {
  const columns = [
    {
      code: 110000,
      name: '北京市',
    },
    {
      code: 120000,
      name: '天津市',
    },
    {
      code: 130000,
      name: '河北省',
    },
    {
      code: 140000,
      name: '山东省',
    },
  ]

  const [value, setValue] = useState<number>()

  return (
    <Cell.Group card>
      <Cell linkable title="设置为: 天津市" onClick={() => setValue(120000)} />
      <Cell linkable title="清空" onClick={() => setValue(undefined)} />
      <Cell>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Picker
            columns={columns}
            optionKeys={{ label: 'name', value: 'code' }}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
