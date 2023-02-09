/*
### 只读
*/

import { Rate } from 'sard'

export default function () {
  return (
    <>
      <Rate defaultValue={3} readOnly />
    </>
  )
}
