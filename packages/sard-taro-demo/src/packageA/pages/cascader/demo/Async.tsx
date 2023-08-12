import { Cascader, Cell, Popout, Toast } from 'sard-taro'
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
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择">
        <Popout.Outlet>
          {({ triggerArgs: [, options = []], setVisible }) => (
            <Cell
              title="请选择"
              value={options.map((option) => option.label).join('/')}
              onClick={() => setVisible(true)}
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Cascader options={options} onSelect={handleSelect} />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
