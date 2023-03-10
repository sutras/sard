/*
### 受控的
*/

import { useState } from 'react'
import { Button, Picker } from 'sard'

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

  const [value, setValue] = useState(['0-19', '1-3'])

  const changeValue = ['0-7', '1-0']

  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <>
      <Button onClick={() => setValue(changeValue)}>
        change to: {JSON.stringify(changeValue)}
      </Button>

      <p>current value: {JSON.stringify(value)}</p>

      <Picker columns={columns} value={value} onChange={handleChange} />
    </>
  )
}
