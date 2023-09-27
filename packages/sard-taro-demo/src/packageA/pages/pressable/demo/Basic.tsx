import { View } from '@tarojs/components'
import { Pressable } from 'sard-taro'

export default () => {
  return (
    <Pressable>
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
  )
}
