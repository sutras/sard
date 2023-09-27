import { useRef, ReactNode, FC } from 'react'
import classNames from 'classnames'
import { CustomWrapper, ITouch, ITouchEvent, View } from '@tarojs/components'
import { useControllableValue, useEvent, useBem, useSelectorId } from '../use'
import {
  NodeRect,
  filterNullish,
  getRectByElement,
  getShadow,
  isNullish,
  isRN,
  minmax,
  mround,
} from '../utils'
import { BaseProps } from '../base'
import { PanEvent, usePan } from '../pan-gesture-detector/usePan'
import PanGestureDetector from '../pan-gesture-detector'

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
    onAfterChange,
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

  const handleSliderClick = useEvent(async (event: ITouchEvent) => {
    if (disabled || readOnly) {
      return
    }

    let touch = event as unknown as ITouch

    if (event.changedTouches) {
      touch = event.changedTouches[0]
    }

    const res = await getRectByElement(trackRef.current, contextId)

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

  const downFields = useRef<NodeRect>()
  const downValue = useRef(innerValue)
  const moveValue = useRef<SliderProps['value']>()
  const downRatio = useRef(0)

  const handleTouchStart = useEvent(async (index: number) => {
    if (disabled || readOnly) {
      return
    }

    downFields.current = await getRectByElement(trackRef.current, contextId)

    const value = Array.isArray(innerValue) ? innerValue[index] : innerValue

    downRatio.current = (value - min) / (max - min)
    downValue.current = innerValue
  })

  const handleTouchMove = useEvent((event: PanEvent, index: number) => {
    if (disabled || readOnly) {
      return
    }

    const res = downFields.current as NodeRect

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

    moveValue.current = nextValue
    setInnerValue(nextValue)
  })

  const handleTouchEnd = useEvent(() => {
    if (disabled || readOnly) {
      return
    }

    const moveVal = moveValue.current
    const downVal = downValue.current

    if (!isNullish(moveVal)) {
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

    moveValue.current = undefined
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
        className={classNames(
          bem.b(),
          bem.m('vertical', vertical),
          bem.m('disabled', disabled),
          bem.m('readonly', readOnly),
          className,
        )}
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
