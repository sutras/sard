import { useState } from 'react'
import { Pagination } from 'sard-taro'

export default () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      total={100}
      pageSize={10}
      current={current}
      onChange={setCurrent}
    />
  )
}
