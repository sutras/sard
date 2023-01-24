/*
### 默认下标
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs defaultActiveKey={1}>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>
    </>
  )
}
