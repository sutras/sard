/*
### 图片类型图标
*/

import { Empty } from 'sard'

export default function () {
  return (
    <>
      <Empty
        iconProps={{ name: new URL('./empty.svg', import.meta.url).href }}
      />
    </>
  )
}
