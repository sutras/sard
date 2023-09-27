import { View } from '@tarojs/components'
import { useState } from 'react'
import { Pressable, Space, Switch } from 'sard-taro'

export default () => {
  const [disabled, setDisabled] = useState(false)

  return (
    <Space>
      <Switch onChange={setDisabled} />

      <Pressable disabled={disabled}>
        {({ pressed }) => {
          return (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                backgroundColor: 'tomato',
              }}
            >
              {pressed ? 'pressed!' : 'unpressed!'}
            </View>
          )
        }}
      </Pressable>
    </Space>
  )
}
