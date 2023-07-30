import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import { useBem, useControllableValue } from '../use'
import { shuffle } from '../utils'
import { BaseProps } from '../base'

export interface NumberKeyboardProps extends BaseProps, PopupProps {
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  onInput?: (key: string) => void
  onDelete?: () => void
  extraKey?: string
  random?: boolean
  every?: boolean
}

export const NumberKeyboard: FC<NumberKeyboardProps> = (props) => {
  const {
    className,
    visible,
    defaultVisible,
    onVisible,
    onInput,
    onDelete,
    extraKey,
    random,
    every,
    mask = true,
    transparent = true,
    onMaskClick,
    ...restProps
  } = props

  const [bem] = useBem('number-keyboard')

  const [innerVisible, setInnerVisible] = useControllableValue({
    defaultValue: defaultVisible,
    value: visible,
    trigger: onVisible,
    initialValue: false,
  })

  const handleKeyClick = (key: string) => {
    onInput?.(key)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  const handleMaskClick = (event) => {
    setInnerVisible(false)
    onMaskClick?.(event)
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

  useMemo(() => {
    if (random && every && visible) {
      shuffle(numArray, true)
    }
  }, [visible])

  const keys: (string | number)[] = [...numArray]

  if (extraKey) {
    keys.push('extra')
  }
  keys.push('backspace')

  return (
    <Popup
      {...restProps}
      visible={innerVisible}
      effect="slide-bottom"
      mask={mask}
      transparent={transparent}
      onMaskClick={handleMaskClick}
      className={classNames(bem.b(), className)}
    >
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
    </Popup>
  )
}

export default NumberKeyboard
