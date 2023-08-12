import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Icon } from '../icon'
import { useBem } from '../use'
import { shuffle } from '../utils'
import { BaseProps } from '../base'

export interface NumberKeyboardProps extends BaseProps {
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  onInput?: (key: string) => void
  onDelete?: () => void
  extraKey?: string
  random?: boolean
}

export const NumberKeyboard: FC<NumberKeyboardProps> = (props) => {
  const { className, onInput, onDelete, extraKey, random, ...restProps } = props

  const [bem] = useBem('number-keyboard')

  const handleKeyClick = (key: string) => {
    onInput?.(key)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  const numArray = useMemo(() => {
    const arr = Array(10)
      .fill(0)
      .map((_, i) => (i + 1) % 10)

    if (random) {
      shuffle(arr, true)
    }
    return arr
  }, [random])

  const keys: (string | number)[] = [...numArray]

  if (extraKey) {
    keys.push('extra')
  }
  keys.push('backspace')

  const renderKeyboard = () => {
    return (
      <View {...restProps} className={classNames(bem.b(), className)}>
        <View className={bem.e('body')}>
          {keys.map((n, i) => {
            return (
              <View
                key={n}
                className={classNames(
                  bem.e(n),
                  bem.e('key-wrapper'),
                  bem.em('key-wrapper', 'lastnum', i === 9),
                )}
              >
                <View
                  className={classNames(bem.e('key'))}
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
                    <Icon name="backspace"></Icon>
                  ) : (
                    n
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  return renderKeyboard()
}

export default NumberKeyboard
