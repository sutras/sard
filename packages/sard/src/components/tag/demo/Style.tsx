/*
### 自定义样式
*/

import { Tag } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Tag style={{ background: '#ffeed0', color: 'orange' }}>标签</Tag>
      <Tag
        plain
        style={{
          color: 'orange',
        }}
      >
        标签
      </Tag>
    </div>
  )
}
