import { View } from '@tarojs/components'
import { useState } from 'react'
import { NumberKeyboard, PasswordInput } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('')

  return (
    <>
      <View style={{ padding: 20 }}>
        <PasswordInput
          type="underline"
          custom
          focused
          value={value}
          onChange={setValue}
        />
      </View>

      <NumberKeyboard
        onInput={(key) => setValue((value) => value + key)}
        onDelete={() => setValue((value) => value.slice(0, -1))}
      />
    </>
  )
}
