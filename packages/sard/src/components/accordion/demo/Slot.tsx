/*
### 插槽
*/

import { Accordion, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Accordion>
        <Accordion.Item
          title={
            <>
              <Icon name="bi-cup-hot"></Icon> <span>标题1</span>
            </>
          }
          icon={(active) => (
            <Icon
              name={active ? 'bi-arrows-expand' : 'bi-arrows-collapse'}
            ></Icon>
          )}
        >
          内容1
        </Accordion.Item>
        <Accordion.Item title="标题2">内容2</Accordion.Item>
        <Accordion.Item title="标题3">内容3</Accordion.Item>
      </Accordion>
    </>
  )
}
