/*
### 基础使用
*/

import { Result } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Result status="success" title="成功" description="请根据提示进行操作" />
      <Result status="info" title="信息" description="请根据提示进行操作" />
      <Result status="warning" title="警告" description="请根据提示进行操作" />
      <Result status="error" title="错误" description="请根据提示进行操作" />
      <Result status="question" title="疑惑" description="请根据提示进行操作" />
    </div>
  )
}
