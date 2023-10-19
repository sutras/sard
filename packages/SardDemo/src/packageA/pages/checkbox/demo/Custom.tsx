import { useState } from 'react'
import { List, Checkbox } from 'sard'

export default () => {
  const [value, setValue] = useState<string[]>(['option2'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <List card>
        {[
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' },
          { value: 'option3', label: '选项3' },
        ].map((item) => {
          return (
            <Checkbox value={item.value} key={item.value}>
              {(checked, toggle) => {
                return (
                  <List.Item
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
      </List>
    </Checkbox.Group>
  )
}
