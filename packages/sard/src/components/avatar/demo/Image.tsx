/*
### 图片类型
*/

import { Avatar } from 'sard'

export default function () {
  return (
    <>
      <Avatar
        src={new URL('../../../../public/logo.svg', import.meta.url).href}
      />
    </>
  )
}
