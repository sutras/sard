/*
### 自定义图标
*/

import { Rate, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Rate
        defaultValue={2.5}
        allowHalf
        icon={<Icon name="bi-heart-fill"></Icon>}
        voidIcon={<Icon name="bi-heart"></Icon>}
      />
      <div>
        <Rate defaultValue={2.5} allowHalf icon="好" voidIcon="好" />
      </div>
    </>
  )
}
