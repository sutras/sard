/*
### 固定在顶部
*/

import { useState } from 'react'
import { Navbar, Checkbox } from 'sard'

export default function () {
  const [fixed, setFixed] = useState(false)

  return (
    <>
      <Checkbox onChange={setFixed} style={{ marginBottom: 20 }}>
        固定定位
      </Checkbox>

      <Navbar title="标题" fixed={fixed} zIndex="1000" />
    </>
  )
}
