/*
### 自定义标签
*/

import { Tabs, TabPane, Icon, Badge } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Tabs>
        <TabPane
          label={
            <span>
              <Icon name="bi-cup-hot"></Icon> 标签1
            </span>
          }
        >
          内容1
        </TabPane>
        <TabPane
          label={(active) => (
            <span>
              <Icon name={active ? 'bi-cup-hot-fill' : 'bi-cup-hot'}></Icon>{' '}
              标签1
            </span>
          )}
        >
          内容2
        </TabPane>
        <TabPane label={<Badge value={2}>标签3</Badge>}>内容3</TabPane>
      </Tabs>
    </>
  )
}
