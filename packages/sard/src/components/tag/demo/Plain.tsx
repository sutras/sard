/*
### 镂空
*/

import { Tag } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Tag plain theme="primary">
        primary
      </Tag>
      <Tag plain theme="secondary">
        secondary
      </Tag>
      <Tag plain theme="success">
        success
      </Tag>
      <Tag plain theme="info">
        info
      </Tag>
      <Tag plain theme="warning">
        warning
      </Tag>
      <Tag plain theme="danger">
        danger
      </Tag>
    </div>
  )
}
