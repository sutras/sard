/*
### 淡文本按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button type="pale-text" theme="primary">
        primary
      </Button>
      <Button type="pale-text" theme="secondary">
        secondary
      </Button>
      <Button type="pale-text" theme="success">
        success
      </Button>
      <Button type="pale-text" theme="info">
        info
      </Button>
      <Button type="pale-text" theme="warning">
        warning
      </Button>
      <Button type="pale-text" theme="danger">
        danger
      </Button>
    </div>
  )
}
