/*
### 图片类型
*/

import { Avatar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Avatar
        src={new URL('../../../../public/logo.svg', import.meta.url).href}
      />
    </>
  )
}
