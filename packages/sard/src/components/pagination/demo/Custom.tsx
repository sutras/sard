/*
### 自定义
*/

import { Pagination, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Pagination
        total={100}
        pageSize={10}
        prev={<Icon name="bi-chevron-double-left"></Icon>}
        next={<Icon name="bi-chevron-double-right"></Icon>}
        page={(page) => (page === 2 ? <Icon name="bi-cup-hot"></Icon> : page)}
      />
    </>
  )
}
