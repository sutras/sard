/*
### 淡颜色按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button type="pale" theme="primary">
        primary
      </Button>
      <Button type="pale" theme="secondary">
        secondary
      </Button>
      <Button type="pale" theme="success">
        success
      </Button>
      <Button type="pale" theme="info">
        info
      </Button>
      <Button type="pale" theme="warning">
        warning
      </Button>
      <Button type="pale" theme="danger">
        danger
      </Button>
    </div>
  )
}
