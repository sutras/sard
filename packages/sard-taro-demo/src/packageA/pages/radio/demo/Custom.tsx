import { useState } from 'react'
import { Cell, Radio } from 'sard-taro'

export default () => {
  const [value, setValue] = useState<string[]>(['apple'])

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Cell.Group card>
        {[
          { value: 'apple', label: '苹果' },
          { value: 'banana', label: '香蕉' },
          { value: 'peach', label: '桃子' },
        ].map((item) => {
          return (
            <Radio value={item.value} key={item.value}>
              {(checked, toggle) => {
                return (
                  <Cell
                    icon={<Radio checked={checked} />}
                    onClick={toggle}
                    clickable
                    title={item.label}
                  />
                )
              }}
            </Radio>
          )
        })}
      </Cell.Group>
    </Radio.Group>
  )
}
