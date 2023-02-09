/*
### 尺寸
*/

import { Tag } from 'sard'

export default function () {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Tag size="small">标签</Tag>
      <Tag>标签</Tag>
      <Tag size="large">标签</Tag>
    </div>
  )
}
