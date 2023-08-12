import { useState } from 'react'
import { Cell, Picker, Toast } from 'sard-taro'

export default () => {
  const multiArray = [
    Array(10)
      .fill(0)
      .map((_, index) => 2000 + index + '年'),
    Array(12)
      .fill(0)
      .map((_, index) => 1 + index + '月'),
  ]

  const [multiArrayValue, setMultiArrayValue] = useState<(string | number)[]>()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 2003年10月"
        onClick={() => setMultiArrayValue(['2003年', '10月'])}
      />
      <Cell>
        <Picker
          value={multiArrayValue}
          columns={multiArray}
          onChange={(value, ...restArgs) => {
            setMultiArrayValue(value)
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
