import { Text } from '@tarojs/components'
import { useState } from 'react'
import { Slider } from 'sard'

export default () => {
  const [rangeValue, setRangeValue] = useState([20, 80])

  return (
    <>
      <Slider range value={rangeValue} onChange={setRangeValue} />
      <Text>{rangeValue.join(', ')}</Text>
    </>
  )
}
