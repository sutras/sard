/*
### 受控组件
*/

import { Tabs, TabPane } from 'sard'
import { useState } from 'react'

export default function () {
  const [activeKey, setActiveName] = useState(0)

  const handleChange = (index: number) => {
    if (index !== 1) {
      setActiveName(index)
    }
  }

  return (
    <>
      <Tabs activeKey={activeKey} onChange={handleChange}>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2(点击无效)">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>
    </>
  )
}
