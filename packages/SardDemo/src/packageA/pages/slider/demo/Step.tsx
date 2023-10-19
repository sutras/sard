import { Text } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { Slider, Space } from 'sard'

export default () => {
  const [value, setValue] = useState(50)

  const [rangeValue, setRangeValue] = useState([0, 50])

  return (
    <Space>
      {useMemo(() => {
        return (
          <>
            <Slider value={value} step={10} onChange={setValue} />
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
              step={12.3}
              onChange={setRangeValue}
            />
            <Text>{rangeValue.join(', ')}</Text>
          </>
        )
      }, [rangeValue])}
    </Space>
  )
}
