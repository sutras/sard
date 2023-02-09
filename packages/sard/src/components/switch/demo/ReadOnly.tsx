/*
### 只读状态
*/

import { Switch } from 'sard'

export default function () {
  return (
    <>
      <Switch readOnly />
      <Switch defaultChecked readOnly />
    </>
  )
}
