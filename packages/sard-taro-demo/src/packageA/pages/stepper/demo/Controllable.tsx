import { useState } from 'react'
import { Stepper } from 'sard-taro'

export default () => {
  const [count, setCount] = useState<number | string>()

  return <Stepper placeholder="数量" value={count} onChange={setCount} />
}
