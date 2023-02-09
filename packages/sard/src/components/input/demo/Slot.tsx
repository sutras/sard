/*
### 插槽
*/

import { Input, Icon, Button } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Input
        placeholder="自定义样式"
        prepend={<Icon name="bi-search" color="#999" />}
      />
      <Input
        placeholder="自定义样式"
        append={<Button size="small">发送验证码</Button>}
        style={{ marginTop: 10 }}
      />
    </>
  )
}
