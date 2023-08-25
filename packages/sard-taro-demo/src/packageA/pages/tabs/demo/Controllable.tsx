import { useState } from 'react'
import { Tabs, Toast } from 'sard-taro'

export default () => {
  const [activeKey, setActiveKey] = useState(0)
  const handleChange = (key: number) => {
    Toast.show(key)
    setActiveKey(key)
  }

  return (
    <Tabs activeKey={activeKey} onChange={handleChange}>
      {Array(3)
        .fill(0)
        .map((_, i) => {
          return <Tabs.Tab key={i}>{`标签${i + 1}`}</Tabs.Tab>
        })}
    </Tabs>
  )
}
