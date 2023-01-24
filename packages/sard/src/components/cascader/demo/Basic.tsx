/*
### 基础使用
*/

import { Cascader } from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  return (
    <>
      <Cascader options={area} fieldNames={{ label: 'name', value: 'code' }} />
    </>
  )
}
