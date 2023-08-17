import { useState } from 'react'
import { Cell, Picker, PopoutInput } from 'sard-taro'

export default () => {
  const columns = [
    Array(10)
      .fill(0)
      .map((_, index) => 2000 + index + '年'),
    Array(12)
      .fill(0)
      .map((_, index) => 1 + index + '月'),
  ]

  const [value, setValue] = useState<string[]>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 2003年10月"
        onClick={() => setValue(['2003年', '10月'])}
      />
      <Cell linkable title="清空" onClick={() => setValue(undefined)} />
      <Cell>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Picker columns={columns} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
