import {
  useState,
  useRef,
  CSSProperties,
  ReactNode,
  useMemo,
  useEffect,
  SyntheticEvent,
  FC,
} from 'react'
import classNames from 'classnames'
import { UseStrikeConfig, useEvent, useStrike } from '../../use'
import { minmax, mround } from '../../utils'
import { PAN_END, PAN_MOVE, PAN_START } from '../../strike'

type RangeValue = [number, number]

export interface SliderBaseProps {
  className?: string
  style?: CSSProperties
  min?: number
  max?: number
  step?: number
  vertical?: boolean
  disabled?: boolean
  readOnly?: boolean
  pieceColor?: string
  trackColor?: string
  trackSize?: string | number
  thumbColor?: string
  thumbSize?: string | number
  startThumb?: (value: number) => ReactNode
  endThumb?: (value: number) => ReactNode
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  onAfterChange?: (value: number) => void
}

export interface SliderRangeProps extends SliderBaseProps {
  range?: true
  value?: RangeValue
  defaultValue?: RangeValue
  onChange?: (value: RangeValue) => void
  onAfterChange?: (value: RangeValue) => void
}

export type SliderProps = SliderSingleProps | SliderRangeProps

const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'

export const Slider: FC<SliderProps> = (props) => {
  const {
    className,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    readOnly = false,
    pieceColor = '',
    trackColor = '',
    trackSize = '',
    thumbColor = '',
    thumbSize = '',
    startThumb,
    endThumb,
    onAfterChange,
    onChange,
    ...restProps
  } = props

  const [isDown, setIsDown] = useState(false)
  const trackRef = useRef<HTMLDivElement>()
  const trackSizeRef = useRef(0)
  const downCoord = useRef(0)
  const downRatio = useRef(0)
  const oldRatio = useRef(0)
  const isNearStart = useRef(false)

  const getInitValue = (index: number) => {
    return () => {
      const val = range
        ? value ?? defaultValue ?? [min, min]
        : [min, value ?? defaultValue ?? min]
      return minmax(mround((val as RangeValue)[index], step), min, max)
    }
  }
  const [startValue, setStartValue] = useState(getInitValue(0))
  const [endValue, setEndValue] = useState(getInitValue(1))

  const downValue = useRef({
    start: startValue,
    end: endValue,
  })
  const oldValue = useRef({
    start: startValue,
    end: endValue,
  })
  const currRatio = useRef({
    start: 0,
    end: 0,
  })

  // 受控
  useEffect(() => {
    if (value === undefined) {
      return
    }

    let [startValue, endValue] = (range ? value : [min, value]) as RangeValue
    startValue = minmax(mround(startValue, step), min, max)
    endValue = minmax(mround(endValue, step), min, max)
    Object.assign(oldValue.current, {
      start: startValue,
      end: endValue,
    })
    setStartValue(startValue)
    setEndValue(endValue)
  }, [value, range, min, max])

  const [startRatio, endRatio] = useMemo(() => {
    const total = max - min
    const startRatio = (startValue - min) / total
    const endRatio = (endValue - min) / total
    Object.assign(currRatio.current, {
      start: startRatio,
      end: endRatio,
    })

    return [startRatio, endRatio]
  }, [startValue, endValue, min, max])

  const handlePanStart = useEvent(({ x, y }) => {
    if (disabled || readOnly) {
      return
    }

    Object.assign(downValue.current, oldValue.current)

    const rect = trackRef.current.getBoundingClientRect()

    const size = (trackSizeRef.current = vertical ? rect.height : rect.width)
    const rectCoord = vertical ? rect.top : rect.left
    const clientCoord = (downCoord.current = vertical ? y : x)
    const { start: startRatio, end: endRatio } = currRatio.current
    const offset = clientCoord - rectCoord

    if (range) {
      const startDist = Math.abs(offset - startRatio * size)
      const endDist = Math.abs(offset - endRatio * size)
      isNearStart.current = startDist < endDist
    }

    downRatio.current = offset / size
    oldRatio.current = isNearStart.current ? startRatio : endRatio
    setIsDown(true)
  })

  const handleRatio = (ratio: number) => {
    ratio = minmax(mround(ratio, step / (max - min)), 0, 1)
    let { start: startRatio, end: endRatio } = currRatio.current

    if (range) {
      if (isNearStart.current) {
        if (ratio >= endRatio) {
          startRatio = endRatio
          endRatio = ratio
          isNearStart.current = false
        } else {
          startRatio = ratio
        }
      } else {
        if (ratio < startRatio) {
          endRatio = startRatio
          startRatio = ratio
          isNearStart.current = true
        } else {
          endRatio = ratio
        }
      }
    } else {
      endRatio = ratio
    }

    const total = max - min
    const ratioToValue = (ratio: number) =>
      minmax(mround(ratio * total + min, step), min, max)
    const startValue = ratioToValue(startRatio)
    const endValue = ratioToValue(endRatio)

    if (
      oldValue.current.start !== startValue ||
      oldValue.current.end !== endValue
    ) {
      Object.assign(oldValue.current, {
        start: startValue,
        end: endValue,
      })
      // 非受控
      if (value === undefined) {
        setStartValue(startValue)
        setEndValue(endValue)
      }
      onChange?.(
        (range ? [startValue, endValue] : endValue) as RangeValue & number,
      )
    }
  }

  const handlePanMove = useEvent(({ x, y }) => {
    if (disabled || readOnly) {
      return
    }

    const clientCoord = vertical ? y : x
    const ratio =
      (clientCoord - downCoord.current) / trackSizeRef.current +
      oldRatio.current
    handleRatio(ratio)
  })

  const handlePanEnd = useEvent(() => {
    if (disabled || readOnly) {
      return
    }

    setIsDown(false)

    const { start: startValue, end: endValue } = downValue.current

    if (
      oldValue.current.start !== startValue ||
      oldValue.current.end !== endValue
    ) {
      onAfterChange?.(
        (range ? [startValue, endValue] : endValue) as RangeValue & number,
      )
    }
  })

  const startThumbRef = useRef()
  const endThumbRef = useRef()

  useStrike(
    startThumbRef,
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
    },
    {
      pan: true,
      lockDirection: false,
    },
    {
      direction: vertical ? VERTICAL : HORIZONTAL,
    },
  )

  useStrike(
    endThumbRef,
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
    },
    {
      pan: true,
      lockDirection: false,
    },
    {
      direction: vertical ? VERTICAL : HORIZONTAL,
    },
  )

  const handleSliderClick = useEvent((event) => {
    if (disabled || readOnly) {
      return
    }

    const { clientX, clientY } = event
    handlePanStart({
      x: clientX,
      y: clientY,
    })
    handleRatio(downRatio.current)
    handlePanEnd()
  })

  const trackStyle = {
    width: vertical ? trackSize : '',
    height: !vertical ? trackSize : '',
    backgroundColor: trackColor,
  }

  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  const pieceStyle = {
    [vertical ? 'top' : 'left']: startPercent,
    [vertical ? 'height' : 'width']: endPercent,
    backgroundColor: pieceColor,
  }

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
  }

  const sliderClass = classNames(
    's-slider',
    {
      's-slider-is-down': isDown,
      's-slider-vertical': vertical,
      's-slider-disabled': disabled,
      's-slider-readonly': readOnly,
    },
    className,
  )

  const thumbElement = () => (
    <div className="s-slider-thumb" style={thumbStyle}></div>
  )
  const stopPropagation = (event: SyntheticEvent) => event.stopPropagation()

  return (
    <div {...restProps} className={sliderClass}>
      <div
        ref={trackRef}
        className="s-slider-track"
        style={trackStyle}
        onClick={handleSliderClick}
      >
        <div className="s-slider-track-piece" style={pieceStyle}>
          {range && (
            <div
              ref={startThumbRef}
              className="s-slider-thumb-container s-slider-thumb-container-start"
              onClick={stopPropagation}
            >
              {startThumb ? startThumb(startValue) : thumbElement()}
            </div>
          )}

          <div
            ref={endThumbRef}
            className="s-slider-thumb-container s-slider-thumb-container-end"
            onClick={stopPropagation}
          >
            {endThumb ? endThumb(endValue) : thumbElement()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
