/*
### 文本按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button type="text" theme="primary">
        primary
      </Button>
      <Button type="text" theme="secondary">
        secondary
      </Button>
      <Button type="text" theme="success">
        success
      </Button>
      <Button type="text" theme="info">
        info
      </Button>
      <Button type="text" theme="warning">
        warning
      </Button>
      <Button type="text" theme="danger">
        danger
      </Button>
    </div>
  )
}
