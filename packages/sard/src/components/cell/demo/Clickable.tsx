/*
### 可点击的
*/

import { Cell } from 'sard'

export default function () {
  return (
    <>
      <Cell isLink title="标题" />
      <Cell isLink title="标题" value="值" />
      <Cell isLink title="标题" value="值" arrowDirection="down" />
    </>
  )
}
