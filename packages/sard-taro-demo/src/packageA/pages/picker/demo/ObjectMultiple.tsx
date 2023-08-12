import { useState } from 'react'
import { Cell, Picker, Toast } from 'sard-taro'

export default () => {
  const objectMultiArray = [
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

  const [objectMultiArrayValue, setObjectMultiArrayValue] =
    useState<(string | number)[]>()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 2003年10月"
        onClick={() => setObjectMultiArrayValue([2003, 10])}
      />
      <Cell>
        <Picker
          value={objectMultiArrayValue}
          columns={objectMultiArray}
          onChange={(value, ...restArgs) => {
            setObjectMultiArrayValue(value)
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
