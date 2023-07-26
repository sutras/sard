import { useState, useRef, ReactNode, FC } from 'react'
import classNames from 'classnames'
import { ITouch, ITouchEvent, View } from '@tarojs/components'
import { useControllableValue, useEvent, useSelectorId, useBrush } from '../use'
import { NodeRect, getRectById, minmax, mround } from '../utils'
import { BaseProps } from '../base'

type RangeValue = number[]

export interface SliderBaseProps extends BaseProps {
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
  thumb?: (value: number) => ReactNode
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
    thumb,
    onAfterChange,
    onChange,
    ...restProps
  } = props

  const trackId = useSelectorId()

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => (range ? [min, min] : min),
  })

  const handleSliderClick = useEvent(async (event: ITouchEvent) => {
    if (disabled || readOnly) {
      return
    }

    let touch = event as unknown as ITouch

    if (event.touches) {
      touch = event.touches[0]
    }

    const res = await getRectById(trackId, {
      size: true,
      rect: true,
    })

    const size = vertical ? res.height : res.width
    const tapCoord = vertical ? touch.clientY : touch.clientX
    const startCoord = vertical ? res.top : res.left
    const offset = tapCoord - startCoord
    const ratio = offset / size
    const total = max - min
    const tapValue = minmax(mround(min + total * ratio, step), min, max)

    let nextValue

    if (Array.isArray(innerValue)) {
      const [start, end] = innerValue

      if (Math.abs(tapValue - end) <= Math.abs(tapValue - start)) {
        nextValue = [start, tapValue]
      } else {
        nextValue = [tapValue, end]
      }
    } else {
      nextValue = tapValue
    }

    setInnerValue(nextValue)
  })

  const brush = useBrush()
  const [isDown, setIsDown] = useState(false)
  const downFields = useRef<NodeRect>()
  const downValue = useRef(innerValue)
  const moveValue = useRef<SliderProps['value']>(null)
  const downRatio = useRef(0)

  const handleTouchStart = useEvent(
    async (event: ITouchEvent, index: number) => {
      if (disabled || readOnly) {
        return
      }
      setIsDown(true)

      brush.start(event)

      downFields.current = await getRectById(trackId, {
        size: true,
        rect: true,
      })

      const value = Array.isArray(innerValue) ? innerValue[index] : innerValue

      downRatio.current = (value - min) / (max - min)
      downValue.current = innerValue
    },
  )

  const handleTouchMove = useEvent((event: ITouchEvent, index: number) => {
    if (disabled || readOnly) {
      return
    }
    event.preventDefault()

    brush.move(event)

    const res = downFields.current

    const size = vertical ? res.height : res.width
    const delta = vertical ? brush.deltaY : brush.deltaX
    const ratio = delta / size + downRatio.current
    const total = max - min
    const tapValue = minmax(mround(min + total * ratio, step), min, max)

    let nextValue

    if (Array.isArray(downValue.current)) {
      const [start, end] = downValue.current

      if (index === 1) {
        nextValue = tapValue < start ? [tapValue, start] : [start, tapValue]
      } else {
        nextValue = tapValue > end ? [end, tapValue] : [tapValue, end]
      }
    } else {
      nextValue = tapValue
    }

    moveValue.current = nextValue
    setInnerValue(nextValue)
  })

  const handleTouchEnd = useEvent(() => {
    if (disabled || readOnly) {
      return
    }

    setIsDown(false)

    const moveVal = moveValue.current
    const downVal = downValue.current

    if (moveVal !== null) {
      if (range) {
        if (downVal[0] !== moveVal[0] || downVal[1] !== moveVal[1]) {
          onAfterChange?.([...(moveVal as RangeValue)] as RangeValue & number)
        }
      } else {
        if (moveVal !== downVal) {
          onAfterChange?.(moveVal as RangeValue & number)
        }
      }
    }

    moveValue.current = null
  })

  let startValue: number
  let endValue: number

  if (Array.isArray(innerValue)) {
    startValue = innerValue[0]
    endValue = innerValue[1]
  } else {
    startValue = min
    endValue = innerValue
  }

  const startRatio = (startValue - min) / (max - min)
  const endRatio = (endValue - min) / (max - min)
  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  const pieceStyle = {
    [vertical ? 'top' : 'left']: startPercent,
    [vertical ? 'height' : 'width']: endPercent,
    backgroundColor: pieceColor,
  }

  const trackStyle = {
    width: vertical ? trackSize : '',
    height: !vertical ? trackSize : '',
    backgroundColor: trackColor,
  }

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
  }

  const sliderClass = classNames(
    'sar-slider',
    {
      'sar-slider-is-down': isDown,
      'sar-slider-vertical': vertical,
      'sar-slider-disabled': disabled,
      'sar-slider-readonly': readOnly,
    },
    className,
  )

  const defaultThumb = () => (
    <View className="sar-slider-thumb" style={thumbStyle}></View>
  )

  const renderThumb = (index) => {
    const finalThumb =
      thumb || (index === 0 ? startThumb : endThumb) || defaultThumb

    return (
      <View
        key={index}
        className={classNames(
          'sar-slider-thumb-container',
          `sar-slider-thumb-${index === 0 ? 'start' : 'end'}`,
        )}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(event: ITouchEvent) => handleTouchStart(event, index)}
        onTouchMove={(event: ITouchEvent) => handleTouchMove(event, index)}
        onTouchEnd={() => handleTouchEnd()}
        onTouchCancel={() => handleTouchEnd()}
      >
        {finalThumb(index === 0 ? startValue : endValue)}
      </View>
    )
  }

  return (
    <View {...restProps} className={sliderClass} onClick={handleSliderClick}>
      <View id={trackId} className="sar-slider-track" style={trackStyle}>
        <View className="sar-slider-track-piece" style={pieceStyle}>
          {range ? [renderThumb(0), renderThumb(1)] : renderThumb(1)}
        </View>
      </View>
    </View>
  )
}

export default Slider