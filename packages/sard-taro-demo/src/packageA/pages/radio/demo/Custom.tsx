import { useState } from 'react'
import { List, Radio } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('option1')

  return (
    <Radio.Group value={value} onChange={setValue}>
      <List card>
        {[
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' },
          { value: 'option3', label: '选项3' },
        ].map((item) => {
          return (
            <Radio value={item.value} key={item.value}>
              {(checked, toggle) => {
                return (
                  <List.Item
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
      </List>
    </Radio.Group>
  )
}
