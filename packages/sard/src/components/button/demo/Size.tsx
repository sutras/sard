/*
### 按钮尺寸
*/

import { Button } from 'sard'

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
      <Button size="small">primary小</Button>
      <Button>primary默认</Button>
      <Button size="large">primary大</Button>
    </div>
  )
}
