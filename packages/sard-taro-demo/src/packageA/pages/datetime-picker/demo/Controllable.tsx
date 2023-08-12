import { Cell, DatetimePicker } from 'sard-taro'
import { useState } from 'react'

export default () => {
  const [value, setValue] = useState(new Date())

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为当前时间"
        value={value.toLocaleString()}
        onClick={() => setValue(new Date())}
      />
      <Cell>
        <DatetimePicker value={value} onChange={setValue} type="yMd" />
      </Cell>
    </Cell.Group>
  )
}
