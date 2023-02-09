/*
### 基础使用
*/

import { useState } from 'react'
import { Collapse, Button } from 'sard'

export default function Component() {
  const [visible, setVisible] = useState(true)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <>
      <Button onClick={handleClick}>toggle</Button>
      <br />
      <br />
      <Collapse visible={visible}>
        <div style={{ backgroundColor: 'orange', padding: 10 }}>
          <p>collapse</p>
          <p>collapse</p>
          <p>collapse</p>
          <p>collapse</p>
          <p>collapse</p>
          <p>collapse</p>
          <p>collapse</p>
        </div>
      </Collapse>
    </>
  )
}
