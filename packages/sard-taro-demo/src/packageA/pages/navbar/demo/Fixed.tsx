import { useState } from 'react'
import { Checkbox, Navbar } from 'sard-taro'

export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <>
      <Checkbox onChange={setFixed} style={{ margin: 20 }}>
        固定到顶部
      </Checkbox>

      <Navbar title="顶部的标题" fixed={fixed} zIndex="1000" />
    </>
  )
}
