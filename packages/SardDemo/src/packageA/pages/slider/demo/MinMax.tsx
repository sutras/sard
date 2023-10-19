import { Text } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { Slider, Space } from 'sard'

export default () => {
  const [value, setValue] = useState(0)

  const [rangeValue, setRangeValue] = useState([0, 30])

  return (
    <Space>
      {useMemo(() => {
        return (
          <>
            <Slider value={value} min={-50} max={50} onChange={setValue} />
            <Text>{value}</Text>
          </>
        )
      }, [value])}

      {useMemo(() => {
        return (
          <>
            <Slider
              range
              value={rangeValue}
              min={-50}
              max={50}
              onChange={setRangeValue}
            />
            <Text>{rangeValue.join(', ')}</Text>
          </>
        )
      }, [rangeValue])}
    </Space>
  )
}
