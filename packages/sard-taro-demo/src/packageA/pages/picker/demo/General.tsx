import { useState } from 'react'
import { Cell, Picker, Toast } from 'sard-taro'

export default () => {
  const array = ['北京市', '天津市', '河北省', '山东省']

  const [arrayValue, setArrayValue] = useState<(string | number)[]>()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 天津市"
        onClick={() => setArrayValue(['天津市'])}
      />
      <Cell>
        <Picker
          value={arrayValue}
          columns={array}
          onChange={(value, ...restArgs) => {
            setArrayValue(value)
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
