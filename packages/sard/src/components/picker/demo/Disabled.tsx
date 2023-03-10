/*
### 禁用选项
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
          label: `column${i}-item${j}` + `${j % 2 === 0 ? '-disabled' : ''}`,
          disabled: j % 2 === 0,
        })),
    )

  return (
    <>
      <Picker columns={columns} defaultValue={['0-1', '1-3']} />
    </>
  )
}
