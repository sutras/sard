import { useState } from 'react'
import { Cell, Picker, Toast } from 'sard-taro'

export default () => {
  const objectArray = [
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

  const [objectArrayValue, setObjectArrayValue] =
    useState<(string | number)[]>()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 天津市"
        onClick={() => setObjectArrayValue([120000])}
      />
      <Cell>
        <Picker
          value={objectArrayValue}
          columns={objectArray}
          optionKeys={{ label: 'name', value: 'code' }}
          onChange={(value, ...restArgs) => {
            setObjectArrayValue(value)
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
