import { useState } from 'react'
import { Pagination } from 'sard'

export default () => {
  const [current, setCurrent] = useState(1)

  return <Pagination total={100} current={current} onChange={setCurrent} />
}
