/*
### 基础使用
*/

import { Picker } from 'sard'

export default function () {
  const columns = Array(1)
    .fill(0)
    .map((_, i) =>
      Array(60)
        .fill(0)
        .map((_, j) => ({
          value: `${i}-${j}`,
          label: `column${i}-item${j}`,
        })),
    )

  return (
    <>
      <Picker columns={columns} />
    </>
  )
}
