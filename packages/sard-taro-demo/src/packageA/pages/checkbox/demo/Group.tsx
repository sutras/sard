import { View } from '@tarojs/components'
import { useState } from 'react'
import { Checkbox, Space } from 'sard-taro'

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any[]>(['apple'])

  return (
    <Space vertical gap="large">
      <View>
        <Checkbox.Group value={value} onChange={setValue}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="banana">香蕉</Checkbox>
        </Checkbox.Group>
        {JSON.stringify(value)}
      </View>

      <View>
        <View>垂直：</View>
        <Checkbox.Group vertical value={value} onChange={setValue}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="banana">香蕉</Checkbox>
        </Checkbox.Group>
      </View>
    </Space>
  )
}
