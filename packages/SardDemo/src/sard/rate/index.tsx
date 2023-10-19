import { ReactNode, useRef, FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useControllableValue, useEvent, useSelectorId, useBem } from '../use'
import { Icon, IconProps } from '../icon'
import { BaseProps } from '../base'
import { addPxInWeb, filterNullish, getRectByElement, isRN } from '../utils'
import { usePan } from '../pan-gesture-detector/usePan'
import PanGestureDetector from '../pan-gesture-detector'
import CustomWrapper from '../custom-wrapper'

export interface RateProps extends Omit<BaseProps, 'children'> {
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  clearable?: boolean
  count?: number
  size?: number
  gap?: number
  icon?: ReactNode
  iconProps?: IconProps
  voidIcon?: ReactNode
  voidIconProps?: IconProps
  color?: string
  voidColor?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: number) => void
}

export const Rate: FC<RateProps> = (props) => {
  const {
    className,
    style,

    value,
    defaultValue,
    allowHalf,
    clearable,
    count = 5,
    size = 20,
    gap = 10,
    icon,
    iconProps,
    voidIcon,
    voidIconProps,
    color,
    voidColor,
    readOnly,
    disabled,
    onChange,
    ...restProps
  } = props

  const [bem] = useBem('rate')

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: 0,
  })

  const [tempValue, setTempValue] = useState(innerValue)

  const rateStartLeft = useRef(0)
  const contextId = useSelectorId()
  const rateRef = useRef()

  const handleClick = useEvent(async (event, index: number) => {
    if (readOnly || disabled) {
      return
    }

    let nextValue: number

    if (allowHalf) {
      const { left: rateLeft } = await getRectByElement(
        rateRef.current,
        contextId,
      )

      let clientX: number
      if (isRN) {
        clientX = event.changedTouches[0].pageX
      } else {
        clientX = event.touches ? event.touches[0].clientX : event.clientX
      }

      const offsetX = clientX - rateLeft
      const itemOffsetLeft = index * (size + gap)
      const isHalf = offsetX - itemOffsetLeft <= size / 2
      nextValue = index + (isHalf ? 0.5 : 1)
    } else {
      nextValue = index + 1
    }

    if (clearable && nextValue === innerValue) {
      nextValue = 0
    }

    setTempValue(nextValue)
    setInnerValue(nextValue)
  })

  const handlers = usePan({
    start() {
      if (readOnly || disabled) {
        return
      }

      getRectByElement(rateRef.current, contextId).then((res) => {
        rateStartLeft.current = res.left
      })
    },

    move(event) {
      if (readOnly || disabled) {
        return
      }

      if (event.axis === 'vertical') {
        return
      }

      const offsetX = event.moveX - rateStartLeft.current
      if (offsetX < 0) {
        setTempValue(0)
        return
      }

      for (let i = count - 1; i >= 0; i--) {
        const left = i * (gap + size)

        if (offsetX >= left) {
          const index = i + (allowHalf && offsetX <= left + size / 2 ? 0.5 : 1)
          setTempValue(index)
          return
        }
      }
    },

    end() {
      if (readOnly || disabled) {
        return
      }
      setInnerValue(tempValue)
    },
  })

  useEffect(() => {
    setTempValue(innerValue)
  }, [innerValue])

  const lineHeight = addPxInWeb(size ? size * 1.15 : size)
  const fontSize = size

  return (
    <CustomWrapper id={contextId}>
      <PanGestureDetector handlers={handlers}>
        <View
          {...restProps}
          ref={rateRef}
          className={classNames(
            bem.b(),
            bem.m('disabled', disabled),
            bem.m('readonly', readOnly),
            className,
          )}
          style={{
            ...style,
            ...filterNullish({
              gap,
            }),
          }}
        >
          {Array(count)
            .fill(0)
            .map((_, index) => {
              const itemValue = index + 1

              const diff = index + 1 - tempValue
              const width =
                (diff <= 0 ? 1 : diff > 1 ? 0 : tempValue % 1) * 100 + '%'

              return (
                <View
                  className={classNames(
                    bem.e('item'),
                    bem.em('item', 'readonly', readOnly),
                    bem.em('item', 'disabled', disabled),
                  )}
                  key={itemValue}
                  onClick={(event) => handleClick(event, index)}
                >
                  <View
                    className={bem.e('star-void')}
                    style={{
                      fontSize,
                      lineHeight,
                      ...filterNullish({ color: voidColor }),
                    }}
                  >
                    {voidIcon ?? (
                      <Icon
                        name="star"
                        color={disabled ? undefined : voidColor}
                        {...voidIconProps}
                        className={bem.e('star-void-icon')}
                        style={{ fontSize, lineHeight }}
                      />
                    )}
                  </View>
                  <View
                    className={classNames(
                      bem.e('star'),
                      bem.em('star', 'disabled', disabled),
                    )}
                    style={{
                      width,
                      fontSize,
                      lineHeight,
                      ...filterNullish({ color }),
                    }}
                  >
                    {icon ?? (
                      <Icon
                        name="star-fill"
                        color={disabled ? undefined : color}
                        {...iconProps}
                        className={classNames(
                          bem.e('star-icon'),
                          bem.em('star-icon', 'disabled', disabled),
                        )}
                        style={{ fontSize, lineHeight }}
                      />
                    )}
                  </View>
                </View>
              )
            })}
        </View>
      </PanGestureDetector>
    </CustomWrapper>
  )
}

export default Rate
