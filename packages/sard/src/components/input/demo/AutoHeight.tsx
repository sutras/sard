/*
### 自动高度
*/

import { Input } from 'sard'

export default function () {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Input type="textarea" autoHeight placeholder="autoHeight: true" />
      <Input
        type="textarea"
        autoHeight={{ maxHeight: 100 }}
        placeholder="autoHeight: { maxHeight: 100 }"
      />
      <Input
        type="textarea"
        autoHeight={{ minHeight: 100, maxHeight: 200 }}
        placeholder="autoHeight: { minHeight: 100, maxHeight: 200 }"
      />
    </div>
  )
}
