/*
### 禁用状态
*/

import { Switch } from 'sard'

export default function () {
  return (
    <>
      <Switch disabled />
      <Switch defaultChecked disabled />
    </>
  )
}
