/*
### 多列
*/

import { Picker } from 'sard'

export default function () {
  const columns = Array(2)
    .fill(0)
    .map((_, i) =>
      Array(10)
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
