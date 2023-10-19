import { useState } from 'react'
import { List, Picker, PopoutInput } from 'sard'

export default () => {
  const columns = [
    Array(10)
      .fill(0)
      .map((_, index) => ({
        value: 2000 + index,
        label: 2000 + index + '年',
      })),
    Array(12)
      .fill(0)
      .map((_, index) => ({
        value: 1 + index,
        label: 1 + index + '月',
      })),
  ]

  const [value, setValue] = useState<number[]>()

  return (
    <List card>
      <List.Item
        linkable
        title="设置为: 2003年10月"
        onClick={() => setValue([2003, 10])}
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
            columns={columns}
            outletFormatter={(labels) => labels.join('')}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
