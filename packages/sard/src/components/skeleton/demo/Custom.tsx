/*
### 自定义
*/

import { Skeleton } from 'sard'

export default function () {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
      >
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Skeleton.Avatar size={48} animated />
              <Skeleton.Block animated />
            </div>
          ))}
      </div>

      <br />
      <br />
      <br />

      <div style={{ display: 'flex', gap: 10 }}>
        <Skeleton.Block style={{ width: 100, height: 80 }} animated />
        <div style={{ flex: 1 }}>
          <Skeleton.Paragraph rows={2} animated />
          <Skeleton.Block
            style={{ width: 60, height: 30, marginLeft: 'auto' }}
            animated
          />
        </div>
      </div>
    </>
  )
}
