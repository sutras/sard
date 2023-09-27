import { useState } from 'react'
import { Tabs } from 'sard-taro'

export default () => {
  const [activeKey, setActiveKey] = useState<number | string>(0)

  return (
    <Tabs activeKey={activeKey} onChange={setActiveKey}>
      <Tabs.Tab>标签1</Tabs.Tab>
      <Tabs.Tab>标签2</Tabs.Tab>
      <Tabs.Tab>标签3</Tabs.Tab>
    </Tabs>
  )
}
