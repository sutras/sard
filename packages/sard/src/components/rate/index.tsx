import { CSSProperties, ReactNode, useRef, FC, useEffect } from 'react'
import classNames from 'classnames'
import { useControlledValue, useEvent, useStrike } from '../../use'
import { Icon } from '../icon'
import { PAN_START, PAN_MOVE, TAP, StrikePanEvent, PAN_END } from '../../strike'

export interface RateProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
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
    children,
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

  const [innerValue, setInnerValue] = useControlledValue<number>(props, {
    defaultValue: 0,
  })

  const panStartLeft = useRef(0)
  const rateRef = useRef<HTMLDivElement>()

  const itemsBoundary = useRef<[number, number][]>([])
  const items = useRef([])
  const itemRefCallback = (i, el) => {
    if (i === 0) {
      items.current = []
    }
    items.current[i] = el
  }

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

  const handlePanstart = useEvent(() => {
    if (readOnly || disabled) {
      return
    }
    if (rateRef.current) {
      panStartLeft.current = rateRef.current.getBoundingClientRect().left
    }
    itemsBoundary.current = []
    items.current.forEach((el, i) => {
      const rect = el.getBoundingClientRect()
      itemsBoundary.current[i] = [rect.left, rect.right]
    })
  })

  const handlePanChange = ({ x }: StrikePanEvent) => {
    if (readOnly || disabled) {
      return
    }
    const offsetX = x - panStartLeft.current
    const boundaries = itemsBoundary.current
    if (offsetX < 0) {
      setValueByCurrent(allowClear ? 0 : allowHalf ? 0.5 : 1)
      return
    }

    for (let i = boundaries.length - 1; i >= 0; i--) {
      const [left, right] = boundaries[i]
      if (x >= left) {
        setValueByCurrent(i + (allowHalf && x < (right + left) / 2 ? 0.5 : 1))
        return
      }
    }
  }

  const handlePanmove = useEvent((event: StrikePanEvent) => {
    handlePanChange(event)
  })

  const handleTap = useEvent((event: StrikePanEvent) => {
    handlePanChange(event)
  })

  const handlePanend = useEvent(() => {
    if (readOnly || disabled) {
      return
    }
    setInnerValue(tempValue.current)
  })

  const rateBinding = useStrike(
    (strike) => {
      strike.on(PAN_START, handlePanstart)
      strike.on(PAN_MOVE, handlePanmove)
      strike.on(PAN_END, handlePanend)
      strike.on(TAP, handleTap)
    },
    {
      pan: true,
      direction: 'horizontal',
      lockDirection: true,
      tap: true,
    },
  )

  useEffect(() => {
    setValueByCurrent(innerValue)
  }, [innerValue, itemStars.current])

  const rateClass = classNames(
    's-rate',
    {
      's-rate-disabled': disabled,
      's-rate-readonly': readOnly,
    },
    className,
  )

  const rateStyle = {
    fontSize: size,
    ...style,
  }

  return (
    <div
      {...restProps}
      {...rateBinding}
      className={rateClass}
      style={rateStyle}
      ref={rateRef}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => {
          const itemValue = index + 1

          return (
            <div
              className="s-rate-item"
              key={itemValue}
              style={{
                marginLeft: itemValue !== 1 ? spacing : '',
              }}
              ref={(el) => itemRefCallback(index, el)}
            >
              <div className="s-rate-star-void" style={{ color: voidColor }}>
                {voidIcon ?? <Icon prefix="si" name="star"></Icon>}
              </div>
              <div
                className="s-rate-star"
                style={{
                  color: color,
                }}
                ref={(el) => itemStarRefCallback(index, el)}
              >
                {icon ?? <Icon prefix="si" name="star-fill"></Icon>}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Rate
