import { useState } from 'react'
import { Button, List, Dropdown, Switch } from 'sard-taro'

export default () => {
  const options1 = [
    {
      label: '距离优先',
      value: '1',
    },
    {
      label: '速度优先',
      value: '2',
    },
    {
      label: '评分优先',
      value: '3',
    },
  ]

  const [visible, setVisible] = useState(false)

  return (
    <Dropdown direction="up">
      <Dropdown.Item options={options1} defaultValue="1" />
      <Dropdown.Item title="筛选" visible={visible} onVisible={setVisible}>
        <List inlaid>
          <List.Item title="包邮" value={<Switch />} />
          <List.Item title="团购" value={<Switch />} />
          <List.Item>
            <Button onClick={() => setVisible(false)}>确认</Button>
          </List.Item>
        </List>
      </Dropdown.Item>
    </Dropdown>
  )
}
