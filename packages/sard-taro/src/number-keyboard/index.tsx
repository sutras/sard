import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import { useControllableValue } from '../use'
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
    clearMask = true,
    onMaskClick,
    ...restProps
  } = props

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

  return (
    <Popup
      {...restProps}
      visible={innerVisible}
      effect="slide-bottom"
      mask={mask}
      clearMask={clearMask}
      onMaskClick={handleMaskClick}
      className={classNames(
        'sar-number-keyboard',
        {
          'sar-number-keyboard-has-extra': extraKey !== undefined,
        },
        className,
      )}
    >
      <View className="sar-number-keyboard-body">
        {numArray.map((n, i) => (
          <View
            key={n}
            className={classNames('sar-number-keyboard-key', {
              'sar-number-keyboard-key-lastnum': i === 9,
            })}
            onClick={() => handleKeyClick(String(n))}
          >
            {n}
          </View>
        ))}
        {extraKey && (
          <View
            className="sar-number-keyboard-key"
            onClick={() => handleKeyClick(extraKey)}
          >
            {extraKey}
          </View>
        )}
        <View className="sar-number-keyboard-key" onClick={handleDelete}>
          <Icon name="backspace"></Icon>
        </View>
      </View>
    </Popup>
  )
}

export default NumberKeyboard
