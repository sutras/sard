/*
### 图标类型
*/

import { Radio } from 'sard'

export default function () {
  return (
    <Radio.Group defaultValue="normal" type="check">
      <Radio value="normal">正常</Radio>
      <Radio value="abnormal">异常</Radio>
    </Radio.Group>
  )
}
