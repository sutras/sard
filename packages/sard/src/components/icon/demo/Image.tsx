/*
### 图片 Url
*/

import { Icon } from 'sard'

export default function () {
  return (
    <>
      <Icon
        size="24px"
        name={new URL('../../../../public/logo.svg', import.meta.url).href}
      />
    </>
  )
}
