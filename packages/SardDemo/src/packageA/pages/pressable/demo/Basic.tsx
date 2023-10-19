import { View } from '@tarojs/components'
import { Pressable } from 'sard'

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
              color: 'white',
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
