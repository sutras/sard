/*
### 类型
*/

import { Input } from 'sard'

export default function () {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Input placeholder="文本" type="text" />
      <Input placeholder="数字" type="number" />
      <Input placeholder="电话" type="tel" />
      <Input placeholder="密码" type="password" />
      <Input placeholder="url" type="url" />
      <Input placeholder="搜索" type="search" />
      <Input placeholder="文本域" type="textarea" />
    </div>
  )
}
