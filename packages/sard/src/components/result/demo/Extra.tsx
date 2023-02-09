/*
### 额外内容
*/

import { Result, Button } from 'sard'

export default function () {
  return (
    <>
      <Result status="success" title="成功" description="请根据提示进行操作">
        <Button>返回首页</Button>
      </Result>
    </>
  )
}
