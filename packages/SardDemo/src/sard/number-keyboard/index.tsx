import { memo, useMemo } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Icon } from '../icon'
import { useBem, useEvent } from '../use'
import { shuffle } from '../utils'
import { BaseProps } from '../base'
import Pressable from '../pressable'

export interface NumberKeyboardProps extends BaseProps {
  onInput?: (key: string) => void
  onDelete?: () => void
  extraKey?: string
  random?: boolean
}

export const NumberKeyboard = memo((props: NumberKeyboardProps) => {
  const {
    className,
    style,

    onInput,
    onDelete,
    extraKey,
    random,
    ...restProps
  } = props

  const [bem] = useBem('number-keyboard')

  const handleKeyClick = useEvent((key: string) => {
    onInput?.(key)
  })

  const handleDelete = useEvent(() => {
    onDelete?.()
  })

  const numArray = useMemo(() => {
    const arr = Array(10)
      .fill(0)
      .map((_, i) => (i + 1) % 10)

    if (random) {
      shuffle(arr, true)
    }
    return arr
  }, [random])

  const keysElement = useMemo(() => {
    const keys: (string | number)[] = [...numArray]

    if (extraKey) {
      keys.splice(keys.length - 1, 0, 'extra')
    }
    keys.push('backspace')

    return keys.map((n) => {
      return (
        <View key={n} className={classNames(bem.e(n), bem.e('key-wrapper'))}>
          <Pressable>
            {({ pressed }) => (
              <View
                className={classNames(
                  bem.e('key'),
                  bem.em('key', 'pressed', pressed),
                )}
                onClick={() => {
                  switch (n) {
                    case 'backspace':
                      handleDelete()
                      break
                    default:
                      handleKeyClick(String(n))
                      break
                  }
                }}
              >
                {n === 'extra' ? (
                  extraKey
                ) : n === 'backspace' ? (
                  <Icon name="backspace" className={bem.e('backspace-icon')} />
                ) : (
                  n
                )}
              </View>
            )}
          </Pressable>
        </View>
      )
    })
  }, [numArray, extraKey])

  const renderKeyboard = () => {
    return (
      <View
        {...restProps}
        className={classNames(bem.b(), className)}
        style={style}
      >
        <View className={bem.e('body')}>{keysElement}</View>
      </View>
    )
  }

  return renderKeyboard()
})

export default NumberKeyboard
