import { View } from '@tarojs/components'
import { useState } from 'react'
import { NumberKeyboard, PasswordInput } from 'sard'

export default () => {
  const [value, setValue] = useState('')

  return (
    <>
      <View style={{ padding: 20 }}>
        <PasswordInput type="underline" custom focused value={value} />
      </View>

      <NumberKeyboard
        onInput={(key) => setValue((value) => (value + key).slice(0, 6))}
        onDelete={() => setValue((value) => value.slice(0, -1))}
      />
    </>
  )
}
