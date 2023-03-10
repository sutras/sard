/*
### 受控组件
*/

import { Tabs, TabPane, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [activeKey, setActiveKey] = useState<number | string>(1)

  return (
    <>
      <Button onClick={() => setActiveKey(2)}>切换到标签3</Button>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>
    </>
  )
}
