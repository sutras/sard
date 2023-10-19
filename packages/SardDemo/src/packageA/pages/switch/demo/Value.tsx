import { View } from '@tarojs/components'
import { useState } from 'react'
import { Space, Switch } from 'sard'

export default () => {
  const [checked, setChecked] = useState(true)
  const [value, setValue] = useState('on')

  return (
    <Space>
      <Switch
        checked={checked}
        onChange={(checked, value) => (setChecked(checked), setValue(value))}
        checkedValue="on"
        uncheckedValue="off"
      />
      <View>{value}</View>
    </Space>
  )
}
