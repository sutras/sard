import { View } from '@tarojs/components'
import { useCallback, useState } from 'react'
import { NumberKeyboard, PasswordInput } from 'sard-taro'

export default () => {
  const [value, setValue] = useState('')

  const handleInput = useCallback((key) => setValue((value) => value + key), [])
  const handleDelete = useCallback(
    () => setValue((value) => value.slice(0, -1)),
    [],
  )

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

      <NumberKeyboard onInput={handleInput} onDelete={handleDelete} />
    </>
  )
}
