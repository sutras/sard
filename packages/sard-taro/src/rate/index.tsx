import { ReactNode, useRef, FC, useEffect } from 'react'
import classNames from 'classnames'
import { ITouch, ITouchEvent, View } from '@tarojs/components'
import { useControllableValue, useEvent, useSelectorId, useBrush } from '../use'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { getRectById } from '../utils'

export interface RateProps extends Omit<BaseProps, 'children'> {
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  allowClear?: boolean
  count?: number
  size?: number | string
  spacing?: number | string
  icon?: ReactNode
  voidIcon?: ReactNode
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
    allowClear,
    count = 5,
    size,
    spacing,
    icon,
    voidIcon,
    color,
    voidColor,
    readOnly,
    disabled,
    onChange,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: 0,
  })

  const rateStartLeft = useRef(0)
  const rateId = useSelectorId()
  const rateItemId = useSelectorId()

  const itemsBoundary = useRef<[number, number][]>([])

  const itemStars = useRef<HTMLDivElement[]>([])
  const itemStarRefCallback = (i, el) => {
    if (i === 0) {
      itemStars.current = []
    }
    itemStars.current[i] = el
  }

  const tempValue = useRef(innerValue)

  const updateStar = () => {
    itemStars.current.forEach((el, i) => {
      const diff = i + 1 - tempValue.current
      el.style.width =
        (diff <= 0 ? 1 : diff > 1 ? 0 : tempValue.current % 1) + 'em'
    })
  }

  const setValueByCurrent = (current: number) => {
    tempValue.current = current
    updateStar()
  }

  const handleClick = useEvent((event: ITouchEvent, index: number) => {
    if (readOnly || disabled) {
      return
    }

    if (allowHalf) {
      getRectById(`${rateItemId}_${index}`, {
        rect: true,
        size: true,
      }).then((res) => {
        let touch = event as unknown as ITouch
        if (event.touches) {
          touch = event.touches[0]
        }
        const isHalf = touch.clientX - res.left < res.width / 2
        setValueByCurrent(index + (isHalf ? 0.5 : 1))
      })
    } else {
      setValueByCurrent(index + 1)
    }

    setInnerValue(tempValue.current)
  })

  const brush = useBrush()

  const handleTouchStart = useEvent((event: ITouchEvent) => {
    if (readOnly || disabled) {
      return
    }

    brush.start(event)

    getRectById(rateId, {
      rect: true,
    }).then((res) => {
      rateStartLeft.current = res.left
    })

    itemsBoundary.current = []
    for (let i = 0; i < count; i++) {
      getRectById(`${rateItemId}_${i}`, {
        rect: true,
      }).then((res) => {
        itemsBoundary.current[i] = [res.left, res.right]
      })
    }
  })

  const handleTouchMove = useEvent((event: ITouchEvent) => {
    if (readOnly || disabled) {
      return
    }

    brush.move(event)
    if (brush.isVertical()) {
      return
    }

    event.preventDefault()

    const offsetX = brush.clientX - rateStartLeft.current
    const boundaries = itemsBoundary.current
    if (offsetX < 0) {
      setValueByCurrent(allowClear ? 0 : allowHalf ? 0.5 : 1)
      return
    }

    for (let i = boundaries.length - 1; i >= 0; i--) {
      const [left, right] = boundaries[i]
      if (brush.clientX >= left) {
        setValueByCurrent(
          i + (allowHalf && brush.clientX < (right + left) / 2 ? 0.5 : 1),
        )
        return
      }
    }
  })

  const handleTouchEnd = useEvent(() => {
    if (readOnly || disabled) {
      return
    }
    setInnerValue(tempValue.current)
  })

  useEffect(() => {
    setValueByCurrent(innerValue)
  }, [innerValue, itemStars.current])

  const rateClass = classNames(
    'sar-rate',
    {
      'sar-rate-disabled': disabled,
      'sar-rate-readonly': readOnly,
    },
    className,
  )

  const rateStyle = {
    fontSize: size,
    ...style,
  }

  return (
    <View
      {...restProps}
      id={rateId}
      className={rateClass}
      style={rateStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => {
          const itemValue = index + 1
          const id = `${rateItemId}_${index}`

          return (
            <View
              className="sar-rate-item"
              id={id}
              key={itemValue}
              style={{
                marginLeft: itemValue !== 1 ? spacing : '',
              }}
              onClick={(event) => handleClick(event, index)}
            >
              <View className="sar-rate-star-void" style={{ color: voidColor }}>
                {voidIcon ?? <Icon name="star"></Icon>}
              </View>
              <View
                className="sar-rate-star"
                style={{
                  color: color,
                }}
                ref={(el) => itemStarRefCallback(index, el)}
              >
                {icon ?? <Icon name="star-fill"></Icon>}
              </View>
            </View>
          )
        })}
    </View>
  )
}

export default Rate
