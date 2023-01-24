/*
### 自定义图片
*/

import { Empty, Icon } from 'sard'

export default function () {
  return (
    <>
      <Empty
        icon={<Icon name={new URL('./empty.svg', import.meta.url).href}></Icon>}
      />
    </>
  )
}
