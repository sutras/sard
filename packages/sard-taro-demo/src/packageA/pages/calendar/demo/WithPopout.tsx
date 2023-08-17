import { useState } from 'react'
import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  const [value, setValue] = useState<Date>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为当前日期"
        onClick={() => setValue(new Date())}
      />
      <Cell linkable title="清空" onClick={() => setValue(undefined)} />
      <Cell>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Calendar />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
