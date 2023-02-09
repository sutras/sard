/*
### 主题色
*/

import { Tag } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Tag theme="primary">primary</Tag>
      <Tag theme="secondary">secondary</Tag>
      <Tag theme="success">success</Tag>
      <Tag theme="info">info</Tag>
      <Tag theme="warning">warning</Tag>
      <Tag theme="danger">danger</Tag>
    </div>
  )
}
