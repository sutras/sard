import { FC, useEffect, useMemo } from 'react'
import { CustomWrapper, ITouchEvent } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useControllableValue, useEvent } from '../use'
import Loading from '../loading'
import { BaseProps } from '../base'
import { filterNullish, isRN } from '../utils'
import { Animated } from '../animated'

export interface SwitchProps extends BaseProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean, value: any) => void
  disabled?: boolean
  readOnly?: boolean
  loading?: boolean
  size?: number
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  onClick?: (event: ITouchEvent) => void
}

const aspectRatio = 5 / 3
const thumbGap = 2

export const Switch: FC<SwitchProps> = (props) => {
  const {
    className,
    style,

    checked,
    defaultChecked,
    onChange,
    disabled = false,
    readOnly = false,
    loading = false,
    size = 30,
    checkedColor = '#0d6efd',
    uncheckedColor = '#ededed',
    checkedValue = true,
    uncheckedValue = false,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('switch')

  const [innerChecked, setInnerChecked] = useControllableValue({
    value: checked,
    defaultValue: defaultChecked,
    trigger: onChange,
    initialValue: false,
  })

  const onSwitchClick = useEvent((event: ITouchEvent) => {
    if (disabled || readOnly || loading) {
      return
    }

    setInnerChecked(
      !innerChecked,
      !innerChecked ? checkedValue : uncheckedValue,
    )

    onClick?.(event)
  })

  const thumbSize = size - thumbGap * 2
  const offsetX = size * aspectRatio - size

  // Animated >>>
  const anim = useMemo(() => new Animated.Value(0), [])
  const bgAnim = useMemo(() => new Animated.Value(0), [])
  const interAnim = useMemo(() => {
    return bgAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [uncheckedColor, checkedColor],
    })
  }, [])

  const animateToggle = () => {
    anim.setValue(innerChecked ? 0 : offsetX)
    Animated.timing(anim, {
      toValue: innerChecked ? offsetX : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()

    bgAnim.setValue(innerChecked ? 0 : 1)
    Animated.timing(bgAnim, {
      toValue: innerChecked ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    isRN && animateToggle()
  }, [innerChecked])
  // <<< Animated

  return (
    <CustomWrapper>
      <Animated.View
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m('checked', innerChecked),
          bem.m('disabled', disabled),
          bem.m('readonly', readOnly),
          bem.m('loading', loading),
          className,
        )}
        style={{
          ...style,
          ...filterNullish({
            backgroundColor: isRN
              ? interAnim
              : innerChecked
              ? checkedColor
              : uncheckedColor,
            ...(size ? { width: size * aspectRatio, height: size } : null),
          }),
        }}
        onClick={onSwitchClick}
      >
        <Animated.View
          className={classNames(bem.e('thumb'))}
          style={
            {
              width: thumbSize,
              height: thumbSize,
              ...(isRN
                ? { transform: [{ translateX: anim }] }
                : {
                    transform: `translateX(${innerChecked ? offsetX : 0}px)`,
                  }),
            } as any
          }
        >
          {loading && (
            <Loading className={bem.e('loading')} size={thumbSize * 0.7} />
          )}
        </Animated.View>
      </Animated.View>
    </CustomWrapper>
  )
}

export default Switch
