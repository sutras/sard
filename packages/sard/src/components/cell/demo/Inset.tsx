/*
### 内嵌的图标
*/

import { Cell, Icon } from 'sard'

export default function () {
  return (
    <>
      <Cell title="标题" value="值" icon={<Icon name="bi-1-circle" />} inset />
      <Cell title="标题" value="值" icon={<Icon name="bi-2-circle" />} inset />
      <Cell title="标题" value="值" icon={<Icon name="bi-3-circle" />} inset />
    </>
  )
}
