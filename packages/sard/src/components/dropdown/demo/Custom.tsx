/*
### 自定义内容
*/

import { useState } from 'react'
import { Button, Cell, Dropdown, Switch } from 'sard'

export default function () {
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
    <>
      <Dropdown>
        <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
        <Dropdown.Item title="标题" visible={visible} onVisible={setVisible}>
          <Cell.Group inlaid>
            <Cell title="包邮" value={<Switch></Switch>}></Cell>
            <Cell title="团购" value={<Switch></Switch>}></Cell>
            <Cell>
              <Button block onClick={() => setVisible(false)}>
                确认
              </Button>
            </Cell>
          </Cell.Group>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
