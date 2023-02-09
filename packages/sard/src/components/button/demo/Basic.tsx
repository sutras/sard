/*
### 基础按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button theme="primary">primary</Button>
      <Button theme="secondary">secondary</Button>
      <Button theme="success">success</Button>
      <Button theme="info">info</Button>
      <Button theme="warning">warning</Button>
      <Button theme="danger">danger</Button>
    </div>
  )
}
