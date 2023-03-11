/*
### 字数提示
*/

import { Input } from 'sard'

export default function () {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Input showCount maxLength={20} clearable></Input>
      <Input type="textarea" showCount maxLength={100}></Input>
      <br />
    </div>
  )
}
