import { useState } from 'react'
import { Cell, Checkbox } from 'sard-taro'

export default () => {
  const [value, setValue] = useState<string[]>(['apple'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group card>
        {[
          { value: 'apple', label: '苹果' },
          { value: 'banana', label: '香蕉' },
          { value: 'peach', label: '桃子' },
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