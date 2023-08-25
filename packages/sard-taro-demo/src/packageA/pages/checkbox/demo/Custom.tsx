import { useState } from 'react'
import { Cell, Checkbox } from 'sard-taro'

export default () => {
  const [value, setValue] = useState<string[]>(['option2'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group card>
        {[
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' },
          { value: 'option3', label: '选项3' },
        ].map((item) => {
          return (
            <Checkbox value={item.value} key={item.value}>
              {(checked, toggle) => {
                return (
                  <Cell
                    icon={<Checkbox checked={checked} />}
                    onClick={toggle}
                    clickable
                    title={item.label}
                  />
                )
              }}
            </Checkbox>
          )
        })}
      </Cell.Group>
    </Checkbox.Group>
  )
}
