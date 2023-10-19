import { Text } from '@tarojs/components'
import { useState } from 'react'
import { Slider } from 'sard'

export default () => {
  const [value, setValue] = useState(50)

  return (
    <>
      <Slider value={value} onChange={setValue} />
      <Text>{value}</Text>
    </>
  )
}
