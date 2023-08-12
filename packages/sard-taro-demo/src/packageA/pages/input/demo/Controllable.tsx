import { View } from '@tarojs/components'
import { useState } from 'react'
import { Input } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('受控组件')

  return (
    <>
      <Input placeholder="请输入" value={value} onChange={setValue} />
      <View>{value}</View>
    </>
  )
}
