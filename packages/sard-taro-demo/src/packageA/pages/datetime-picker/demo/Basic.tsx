import { Cell, DatetimePicker, PopoutInput } from 'sard-taro'
import { useState } from 'react'

export default () => {
  const [value, setValue] = useState<Date>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为当前时间"
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
          <DatetimePicker type="yMd" />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
