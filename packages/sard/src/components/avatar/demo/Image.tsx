/*
### 图片类型
*/

import { Avatar } from 'sard'

export default function () {
  return (
    <>
      <Avatar
        src={new URL('../../../../public/pic1.jpg', import.meta.url).href}
      />
    </>
  )
}
