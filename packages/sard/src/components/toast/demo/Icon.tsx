/*
### 自定义图标
*/

import { Toast, Icon, Button } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Button
        onClick={() =>
          Toast.show('休息一下', {
            icon: <Icon name="bi-cup-hot"></Icon>,
          })
        }
      >
        显示提示框
      </Button>
    </>
  )
}
