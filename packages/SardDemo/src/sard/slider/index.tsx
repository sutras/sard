import { useRef, ReactNode, FC, useEffect } from 'react'
import classNames from 'classnames'
import { ITouch, ITouchEvent, View } from '@tarojs/components'
import {
  useControllableValue,
  useEvent,
  useBem,
  useSelectorId,
  useWatchStateSync,
} from '../use'
import {
  NodeRect,
  arrayEqual,
  filterNullish,
  getRectByElement,
  getShadow,
  isMP,
  isNullish,
  isRN,
  isUndefined,
  minmax,
  mround,
  toArray,
} from '../utils'
import { BaseProps } from '../base'
import { PanEvent, usePan } from '../pan-gesture-detector/usePan'
import PanGestureDetector from '../pan-gesture-detector'
import CustomWrapper from '../custom-wrapper'

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
  trackSize?: number
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
  onChangeEnd?: (value: number) => void
}

export interface SliderRangeProps extends SliderBaseProps {
  range?: true
  value?: RangeValue
  defaultValue?: RangeValue
  onChange?: (value: RangeValue) => void
  onChangeEnd?: (value: RangeValue) => void
}

export type SliderProps = SliderSingleProps | SliderRangeProps

export const Slider: FC<SliderProps> = (props) => {
  const {
    className,
    style,

    min = 0,
    max = 100,
    step = 1,
    vertical = false,
    disabled = false,
    readOnly = false,
    pieceColor,
    trackColor,
    trackSize,
    thumbColor,
    thumbSize,
    startThumb,
    endThumb,
    thumb,

    range = false,
    value,
    defaultValue,
    onChangeEnd,
    onChange,
    ...restProps
  } = props

  const [bem] = useBem('slider')

  const contextId = useSelectorId()

  const trackRef = useRef(null)

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => (range ? [min, min] : min),
  })

  const [currentValue, setCurrentValue] = useWatchStateSync(innerValue)

  const handleSliderClick = useEvent(async (event: ITouchEvent) => {
    if (disabled || readOnly) {
      return
    }

    let touch = event as unknown as ITouch

    if (event.changedTouches) {
      touch = event.changedTouches[0]
    }

    if (!isMP) {
      downTrackRect.current = await getRectByElement(
        trackRef.current,
        contextId,
      )
    }
    const res = downTrackRect.current

    if (!res) {
      return
    }

    const size = vertical ? res.height : res.width
    const tapCoord = isRN
      ? vertical
        ? touch.pageY
        : touch.pageX
      : vertical
      ? touch.clientY
      : touch.clientX
    const startCoord = vertical ? res.top : res.left
    const offset = tapCoord - startCoord
    const ratio = offset / size
    const total = max - min
    const tapValue = minmax(mround(min + total * ratio, step), min, max)

    let nextValue

    if (Array.isArray(currentValue)) {
      const [start, end] = currentValue

      if (Math.abs(tapValue - end) <= Math.abs(tapValue - start)) {
        if (tapValue !== currentValue[1]) {
          nextValue = [start, tapValue]
        }
      } else {
        if (tapValue !== currentValue[0]) {
          nextValue = [tapValue, end]
        }
      }
    } else {
      if (tapValue !== currentValue) {
        nextValue = tapValue
      }
    }

    if (!isUndefined(nextValue)) {
      setCurrentValue(nextValue)
      setInnerValue(nextValue)
      onChangeEnd?.(nextValue)
    }
  })

  const downTrackRect = useRef<NodeRect>()
  useEffect(() => {
    getRectByElement(trackRef.current, contextId).then((rect) => {
      downTrackRect.current = rect
    })
  }, [])

  const downValue = useRef(currentValue)
  const moveValue = useRef<SliderProps['value']>()
  const downRatio = useRef(0)

  const handleTouchStart = useEvent(async (index: number) => {
    if (disabled || readOnly) {
      return
    }

    if (!isMP) {
      downTrackRect.current = await getRectByElement(
        trackRef.current,
        contextId,
      )
    }

    const value = Array.isArray(currentValue)
      ? currentValue[index]
      : currentValue

    downRatio.current = (value - min) / (max - min)
    downValue.current = currentValue
    moveValue.current = currentValue
  })

  const handleTouchMove = useEvent((event: PanEvent, index: number) => {
    if (disabled || readOnly) {
      return
    }

    const res = downTrackRect.current as NodeRect

    if (!res) {
      return
    }

    const size = vertical ? res.height : res.width
    const delta = vertical ? event.dy : event.dx
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

    if (!arrayEqual(toArray(nextValue), toArray(moveValue.current))) {
      moveValue.current = nextValue

      setCurrentValue(nextValue)
      setInnerValue(Array.isArray(nextValue) ? [...nextValue] : nextValue)
    }
  })

  const handleTouchEnd = useEvent(() => {
    if (disabled || readOnly) {
      return
    }

    const moveVal = moveValue.current

    if (!isNullish(moveVal)) {
      if (!arrayEqual(toArray(moveVal), toArray(downValue.current))) {
        onChangeEnd?.((Array.isArray(moveVal) ? [...moveVal] : moveVal) as any)
      }
    }

    moveValue.current = undefined
  })

  let startValue: number
  let endValue: number

  if (Array.isArray(currentValue)) {
    startValue = currentValue[0]
    endValue = currentValue[1]
  } else {
    startValue = min
    endValue = currentValue
  }

  const startRatio = (startValue - min) / (max - min)
  const endRatio = (endValue - min) / (max - min)
  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  const startThunbHandlers = usePan({
    start() {
      handleTouchStart(0)
    },
    move(event) {
      handleTouchMove(event, 0)
    },
    end: handleTouchEnd,
  })

  const endThunbHandlers = usePan({
    start() {
      handleTouchStart(1)
    },
    move(event) {
      handleTouchMove(event, 1)
    },
    end: handleTouchEnd,
  })

  const defaultThumb = () => (
    <View
      className={classNames(bem.e('thumb'))}
      style={filterNullish({
        width: thumbSize,
        height: thumbSize,
        backgroundColor: thumbColor,
        ...getShadow('small'),
      })}
    />
  )

  const renderThumb = (index, handlers) => {
    const finalThumb =
      thumb || (index === 0 ? startThumb : endThumb) || defaultThumb

    return (
      <PanGestureDetector handlers={handlers} key={index}>
        <View
          className={classNames(
            bem.e('thumb-container'),
            bem.e(`thumb-${index === 0 ? 'start' : 'end'}`),
            bem.em(
              `thumb-${index === 0 ? 'start' : 'end'}`,
              'vertical',
              vertical,
            ),
            bem.em('thumb-container', 'readonly', readOnly),
            bem.em('thumb-container', 'disabled', disabled),
          )}
        >
          {finalThumb(index === 0 ? startValue : endValue)}
        </View>
      </PanGestureDetector>
    )
  }

  return (
    <CustomWrapper id={contextId}>
      <View
        {...restProps}
        className={classNames(bem.b(), bem.m('vertical', vertical), className)}
        style={style}
        onClick={handleSliderClick}
      >
        <View
          ref={trackRef}
          className={classNames(
            bem.e('track'),
            bem.em('track', 'vertical', vertical),
          )}
          style={filterNullish({
            width: vertical ? trackSize : null,
            height: !vertical ? trackSize : null,
            backgroundColor: trackColor || null,
          })}
        >
          <View
            className={classNames(
              bem.e('track-piece'),
              bem.em('track-piece', 'vertical', vertical),
              bem.em('track-piece', 'disabled', disabled),
            )}
            style={{
              ...filterNullish({
                ...(vertical ? { top: startPercent } : { left: startPercent }),
                ...(vertical ? { height: endPercent } : { width: endPercent }),
                backgroundColor: pieceColor,
              }),
            }}
          >
            {range
              ? [
                  renderThumb(0, startThunbHandlers),
                  renderThumb(1, endThunbHandlers),
                ]
              : renderThumb(1, endThunbHandlers)}
          </View>
        </View>
      </View>
    </CustomWrapper>
  )
}

export default Slider
