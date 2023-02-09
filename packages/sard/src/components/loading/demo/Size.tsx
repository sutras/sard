/*
### 加载尺寸
*/

import { Loading } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Loading size="24px" />
      <Loading type="clock" size="24px" />
      <Loading type="circular" size="24px" />
    </div>
  )
}
