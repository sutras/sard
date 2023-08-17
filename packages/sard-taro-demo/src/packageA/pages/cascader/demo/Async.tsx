import { Cascader, Cell, PopoutInput, Toast } from 'sard-taro'
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
      Toast.loading('加载中')

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
        Toast.hide()
      }, 500)
    }
  }

  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader options={options} onSelect={handleSelect} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
