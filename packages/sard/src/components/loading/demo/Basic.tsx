/*
### 基础使用
*/

import { Loading } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Loading />
      <Loading type="clock" />
      <Loading type="circular" />
    </div>
  )
}
