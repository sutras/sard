import { useState } from 'react'
import { Accordion } from 'sard'

export default () => {
  const [activeKey, setActiveName] = useState(0)
  const handleChange = (key: number) => {
    setActiveName(key)
  }

  return (
    <Accordion activeKey={activeKey} onChange={handleChange}>
      <Accordion.Item title="标题1">内容1</Accordion.Item>
      <Accordion.Item title="标题2">内容2</Accordion.Item>
      <Accordion.Item title="标题3">内容3</Accordion.Item>
    </Accordion>
  )
}
