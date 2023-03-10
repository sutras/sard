import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
  ForwardedRef,
  useMemo,
} from 'react'
import {
  animate,
  AnimateStop,
  easeOutCubic,
  easeOutQuad,
  getRectDampingValue,
  minmax,
  spreadEach,
} from '../../utils'
import {
  PAN_END,
  PAN_SWIPE_UP,
  PAN_SWIPE_DOWN,
  PAN_MOVE,
  PAN_START,
  StrikePanEvent,
} from '../../strike'
import { useEvent, useStrike } from '../../use'
import PickerItem from './Item'

export interface PickerOption {
  label?: any
  value?: any
  disabled?: boolean
  children?: string
  [prop: string]: any
}

export interface FieldNames {
  label?: string
  value?: string
  disabled?: boolean
  children?: string
}

export interface PickerColumnInternalProps {
  column: PickerOption[]
  columnIndex: number
  fieldNames: FieldNames
  defaultIndex?: number
  onChange?: (index: number, columnIndex: number) => void
  onPickStart?: (columnIndex: number) => void
  onPickEnd?: (columnIndex: number) => void
}

export interface PickerColumnExternalProps {
  itemHeight?: number
  focusHeight?: number
}

export type PickerColumnProps = PickerColumnInternalProps &
  PickerColumnExternalProps

export interface PickerColumnRef {
  getIndex: () => number
  getOption: () => PickerOption
  getColumnIndex: () => number
  setIndex: (index: number, emitChange?: boolean, animated?: boolean) => boolean
  setIndexByValue: (
    value: any,
    emitChange?: boolean,
    animated?: boolean,
  ) => boolean
  setIndexForcibly: (index: number) => boolean
  setIndexByValueForcibly: (value: any) => boolean
  pickImmediately: () => void
}

const mapBounceDuration = {
  noBounce: 1200,
  weekBounce: 650,
  strongBounce: 500,
}

const mapBounceEase = {
  noBounce: easeOutCubic,
  weekBounce: easeOutQuad,
  strongBounce: easeOutQuad,
}

const mapBounceInertiaOverflowExtra = {
  noBounce: 0,
  weekBounce: 0.8,
  strongBounce: 1.2,
}

const bounceThreshold = 300
const correctDuration = 300
const damping = 4
const inertiaTime = 250

const maxOverflowCount = 2

export const PickerColumn = memo(
  forwardRef((props: PickerColumnProps, ref: ForwardedRef<PickerColumnRef>) => {
    const {
      itemHeight = 48,
      focusHeight = 56,
      column,
      columnIndex,
      fieldNames,
      defaultIndex = 0,
      onChange,
      onPickStart,
      onPickEnd,
      ...restProps
    } = props

    const isPicking = useRef(false)
    const isMoving = useRef(false)

    const groupRef = useRef<HTMLDivElement>(null)
    const translate = useRef(0)
    const downTranslate = useRef(0)
    const stopInertia = useRef<AnimateStop>()
    const stopCorrect = useRef<AnimateStop>()

    const currentIndex = useRef(minmax(defaultIndex, 0, column.length - 1))

    const setTranslate = (value: number) => {
      translate.current = value
      if (groupRef.current) {
        groupRef.current.style.transform = `translate3d(0, ${value}px, 0)`
      }
    }

    const pickStart = () => {
      if (!isPicking.current) {
        onPickStart?.(columnIndex)
        isPicking.current = true
      }
    }

    const pickEnd = () => {
      if (isPicking.current) {
        isPicking.current = false
        onPickEnd?.(columnIndex)
      }
    }

    const complete = (index: number, emitChange = true) => {
      pickEnd()

      if (currentIndex.current !== index) {
        currentIndex.current = index
        if (emitChange) {
          onChange?.(index, columnIndex)
        }
      }
    }

    const toCorrectPosition = (
      to: number,
      ignoredDisabled = false,
      animated = true,
      emitChange = true,
    ) => {
      if (!ignoredDisabled) {
        to =
          -spreadEach(
            column,
            (option) => !option.disabled,
            Math.abs(Math.round(to / itemHeight)),
            Math.round((to % itemHeight) / itemHeight) ? -1 : 1,
          ) * itemHeight
      }

      stopCorrect.current = animate({
        from: translate.current,
        to,
        duration: animated ? correctDuration : 0,
        step(value) {
          setTranslate(value)
        },
        finish(value) {
          complete(Math.abs(value / itemHeight), emitChange)
        },
      })
    }

    const getCurrentDampedVaule = (value: number, division = false) => {
      return getRectDampingValue(
        value,
        itemHeight,
        itemHeight * column.length,
        division ? 1 / damping || 0 : damping,
      )
    }

    const handlePanStart = useEvent(() => {
      stopInertia.current?.()
      stopCorrect.current?.()
      downTranslate.current = getCurrentDampedVaule(translate.current)
    })

    const handlePanMove = useEvent((event: StrikePanEvent) => {
      isMoving.current = true
      setTranslate(
        getCurrentDampedVaule(downTranslate.current + event.deltaY, true),
      )
    })

    const handlePanSwipe = useEvent((event: StrikePanEvent) => {
      const itemCount = column.length
      const endEdge = (1 - itemCount) * itemHeight
      const isOverflow = translate.current > 0 || translate.current < endEdge

      if (isOverflow) {
        return
      }

      const dir = event.type === PAN_SWIPE_UP ? -1 : 1

      let to = translate.current + dir * (event.speed * inertiaTime)
      to = Math.round(to / itemHeight) * itemHeight

      let type = 'noBounce'
      if (to > bounceThreshold || to < endEdge - bounceThreshold) {
        type = 'strongBounce'
      } else if (to > 0 || to < endEdge) {
        type = 'weekBounce'
      }

      const maxOverflow = maxOverflowCount * itemHeight
      to = minmax(to, endEdge - maxOverflow, maxOverflow)

      pickStart()

      stopInertia.current = animate({
        from: translate.current,
        to,
        duration: mapBounceDuration[type],
        easing: mapBounceEase[type],
        step(value) {
          const extra = mapBounceInertiaOverflowExtra[type]
          const withinTranslate = minmax(
            value,
            (1 - itemCount - extra) * itemHeight,
            extra * itemHeight,
          )

          if (value !== withinTranslate) {
            stopInertia.current?.()
            toCorrectPosition(withinTranslate >= 0 ? 0 : endEdge)
          } else {
            setTranslate(value)
          }
        },
        finish(value) {
          if (value > 0 || value < endEdge) {
            toCorrectPosition(value > 0 ? 0 : endEdge)
          } else {
            if (column[-value / itemHeight].disabled) {
              toCorrectPosition(value)
            } else {
              complete(Math.abs(value / itemHeight))
            }
          }
        },
      })
    })

    const handlePanEnd = useEvent((event: StrikePanEvent) => {
      if (isMoving.current) {
        setTimeout(() => {
          isMoving.current = false
        }, 0)
      }

      const endEdge = (1 - column.length) * itemHeight
      const isOverflow = translate.current > 0 || translate.current < endEdge

      if (
        event.swipe &&
        (event.direction === 'up' || event.direction === 'down') &&
        !isOverflow
      ) {
        return
      }

      pickStart()

      toCorrectPosition(
        -Math.round(minmax(translate.current, endEdge, 0) / itemHeight) *
          itemHeight,
      )
    })

    const columnRef = useRef()

    useStrike(
      columnRef,
      (strike) => {
        strike.on(PAN_START, handlePanStart)
        strike.on(PAN_MOVE, handlePanMove)
        strike.on(PAN_SWIPE_UP, handlePanSwipe)
        strike.on(PAN_SWIPE_DOWN, handlePanSwipe)
        strike.on(PAN_END, handlePanEnd)
      },
      {
        pan: true,
        panSwipeMinSpeed: 0.3,
      },
    )

    useEffect(() => {
      setTranslate(-currentIndex.current * itemHeight)

      return () => {
        stopInertia.current?.()
        stopCorrect.current?.()
      }
    }, [])

    const handleItemClick = (index: number, option: PickerOption) => {
      if (isMoving.current || option.disabled) {
        return
      }
      setIndex(index, true, true)
    }

    const getIndex = useEvent(() => {
      return currentIndex.current
    })

    const getOption = useEvent(() => {
      return column[currentIndex.current]
    })

    const getColumnIndex = useEvent(() => {
      return columnIndex
    })

    const setIndex = useEvent(
      (index: number, emitChange = false, animated = false) => {
        index = minmax(index, 0, column.length - 1)
        if (index === currentIndex.current) {
          return false
        }
        stopInertia.current?.()
        stopCorrect.current?.()
        const to = -index * itemHeight

        pickStart()

        toCorrectPosition(to, true, animated, emitChange)
        return true
      },
    )

    const setIndexByValue = useEvent(
      (value: any, emitChange?: boolean, animated?: boolean) => {
        return column.some((option, index) => {
          if (option[fieldNames.value] === value) {
            setIndex(index, emitChange, animated)
            return true
          }
        })
      },
    )

    // no disabled, no animate, no emit change
    const setIndexForcibly = useEvent((index: number) => {
      index = minmax(index, 0, column.length - 1)
      stopInertia.current?.()
      stopCorrect.current?.()
      const to = -index * itemHeight
      currentIndex.current = index
      setTranslate(to)
      pickEnd()
      return true
    })

    const setIndexByValueForcibly = useEvent((value: any) => {
      const index = column.findIndex(
        (option) => option[fieldNames.value] === value,
      )

      if (index !== -1) {
        return setIndexForcibly(index)
      } else {
        return false
      }
    })

    const pickImmediately = useEvent(() => {
      stopInertia.current?.()
      stopCorrect.current?.()

      const endEdge = (1 - column.length) * itemHeight
      const to =
        -Math.round(minmax(translate.current, endEdge, 0) / itemHeight) *
        itemHeight

      toCorrectPosition(to, false, false, true)
    })

    useImperativeHandle(ref, () => ({
      getIndex,
      getOption,
      getColumnIndex,
      setIndex,
      setIndexByValue,
      setIndexForcibly,
      setIndexByValueForcibly,
      pickImmediately,
    }))

    return (
      <div {...restProps} ref={columnRef} className="s-picker-column">
        <div className="s-picker-mask s-picker-mask-top"></div>
        <div className="s-picker-focus" style={{ height: focusHeight + 'px' }}>
          <div
            className="s-picker-action-area"
            style={{ height: itemHeight + 'px' }}
          >
            <div className="s-picker-item-group" ref={groupRef}>
              {column.map((item, i) => {
                return (
                  <PickerItem
                    {...item}
                    key={i}
                    height={itemHeight}
                    onClick={() => handleItemClick(i, item)}
                  >
                    {item[fieldNames.label]}
                  </PickerItem>
                )
              })}
            </div>
          </div>
        </div>
        <div className="s-picker-mask s-picker-mask-bottom"></div>
      </div>
    )
  }),
)

export default PickerColumn
