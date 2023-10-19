import { Cascader, List, PopoutInput } from 'sard'
import { useState } from 'react'

export default () => {
  const [options, setOptions] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          label: 'label' + i,
          value: i,
          children: [],
        }
      }),
  )

  const handleSelect = (option, columnIndex) => {
    if (columnIndex < 2 && option.children.length === 0) {
      setTimeout(() => {
        option.children = Array(10)
          .fill(0)
          .map((_, i) => {
            return {
              label: option.label + '-label' + i,
              value: option.value + '-' + i,
              children: columnIndex < 1 ? [] : null,
            }
          })

        setOptions(options.slice())
      }, 1000)
    }
  }

  return (
    <List card>
      <List.Item>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader options={options} onSelect={handleSelect} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
