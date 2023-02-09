/*
### 温和按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button type="mild" theme="primary">
        primary
      </Button>
      <Button type="mild" theme="secondary">
        secondary
      </Button>
      <Button type="mild" theme="success">
        success
      </Button>
      <Button type="mild" theme="info">
        info
      </Button>
      <Button type="mild" theme="warning">
        warning
      </Button>
      <Button type="mild" theme="danger">
        danger
      </Button>
    </div>
  )
}
