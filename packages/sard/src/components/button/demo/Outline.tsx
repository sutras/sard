/*
### 轮廓线按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button type="outline" theme="primary">
        primary
      </Button>
      <Button type="outline" theme="secondary">
        secondary
      </Button>
      <Button type="outline" theme="success">
        success
      </Button>
      <Button type="outline" theme="info">
        info
      </Button>
      <Button type="outline" theme="warning">
        warning
      </Button>
      <Button type="outline" theme="danger">
        danger
      </Button>
    </div>
  )
}
