/*
### 受控的
*/

import { Pagination } from 'sard'
import { useState } from 'react'

export default function () {
  const [current, setCurrent] = useState(1)
  return (
    <>
      <Pagination
        total={100}
        pageSize={10}
        current={current}
        onChange={setCurrent}
      />
    </>
  )
}
