import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
  ForwardedRef,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import {
  animate,
  easeOutCubic,
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
import { useStrike, useEvent } from '../../use'

export interface PickerColumnOption {
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

export interface PickerColumnInternalProps extends CommonComponentProps {
  column: PickerColumnOption[]
  columnIndex: number
  fieldNames: FieldNames
  defaultIndex?: number
  onChange?: (columnIndex: number, index: number) => any
  onPickStart?: (columnIndex: number) => any
  onPickEnd?: (columnIndex: number, index: number) => any
}

export interface PickerColumnExternalProps extends CommonComponentProps {
  height?: number
  focusHeight?: number
  duration?: number
  correctDuration?: number
  damping?: number
  inertiaTime?: number
}

export type PickerColumnProps = PickerColumnInternalProps &
  PickerColumnExternalProps

export interface PickerColumnRef {
  setIndex: (index: number, emitChange?: boolean, animated?: boolean) => void
  setIndexByValue: (
    value: any,
    emitChange?: boolean,
    animated?: boolean,
  ) => void
  setIndexForcibly: (index: number) => void
  getIndex: () => number
  getOption: () => PickerColumnOption
  getColumnIndex: () => number
}

export const PickerColumn = memo(
  forwardRef((props: PickerColumnProps, ref: ForwardedRef<PickerColumnRef>) => {
    const {
      height = 48,
      focusHeight = 56,
      duration = 1000,
      correctDuration = 300,
      damping = 5,
      inertiaTime = 250,
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

    const groupRef = useRef<HTMLDivElement>(null)
    const translate = useRef(0)
    const stopInertia = useRef<(...args: any[]) => any>()
    const stopCorrect = useRef<(...args: any[]) => any>()

    const columnMap = useRef<{ [prop: number]: PickerColumnOption }>({})
    const currentIndex = useRef(minmax(defaultIndex, 0, column.length - 1))

    const moving = useRef(false)
    const downTranslate = useRef(0)

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

    const pickEnd = (index: number) => {
      isPicking.current = false
      onPickEnd?.(columnIndex, index)
    }

    const finish = (index: number, emitChange = true) => {
      pickEnd(index)

      if (currentIndex.current !== index) {
        currentIndex.current = index
        if (emitChange) {
          onChange?.(columnIndex, index)
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
            Math.abs(Math.round(to / height)),
            Math.round((to % height) / height) ? -1 : 1,
          ) * height
      }

      stopCorrect.current = animate({
        from: translate.current,
        to,
        duration: animated ? correctDuration : 0,
        step(value) {
          setTranslate(value)
        },
        finish(value) {
          finish(Math.abs(value / height), emitChange)
        },
      })
    }

    const getCurrDampedVaule = (value: number, division = false) => {
      return getRectDampingValue(
        value,
        height,
        height * column.length,
        division ? 1 / damping || 0 : damping,
      )
    }

    const handlePanStart = useEvent(() => {
      stopInertia.current?.()
      stopCorrect.current?.()
      downTranslate.current = getCurrDampedVaule(translate.current)
    })

    const handlePanMove = useEvent((event: StrikePanEvent) => {
      moving.current = true
      setTranslate(
        getCurrDampedVaule(downTranslate.current + event.deltaY, true),
      )
    })

    const handlePanSwipe = useEvent((event: StrikePanEvent) => {
      const itemCount = column.length
      const endEdge = (1 - itemCount) * height
      const dir = event.type === PAN_SWIPE_UP ? -1 : 1
      let to = translate.current + dir * (event.speed * inertiaTime)
      to = Math.round(to / height) * height

      pickStart()

      stopInertia.current = animate({
        from: translate.current,
        to,
        duration,
        easing: easeOutCubic,
        step(value) {
          const extra = 1
          const withinTranslate = minmax(
            value,
            (1 - itemCount - extra) * height,
            extra * height,
          )

          if (value !== withinTranslate) {
            stopInertia.current?.()
            toCorrectPosition(withinTranslate > 0 ? 0 : endEdge)
          } else {
            setTranslate(value)
          }
        },
        finish(value) {
          if (value > 0 || value < endEdge) {
            toCorrectPosition(value > 0 ? 0 : endEdge)
          } else {
            if (column[-value / height].disabled) {
              toCorrectPosition(value)
            } else {
              finish(Math.abs(value / height))
            }
          }
        },
      })
    })

    const handlePanEnd = useEvent((event: StrikePanEvent) => {
      if (moving.current) {
        setTimeout(() => {
          moving.current = false
        }, 0)
      }

      if (
        event.swipe &&
        (event.direction === 'up' || event.direction === 'down')
      ) {
        return
      }

      const itemCount = column.length
      const endEdge = (1 - itemCount) * height

      pickStart()

      toCorrectPosition(
        -Math.round(minmax(translate.current, endEdge, 0) / height) * height,
      )
    })

    const columnBinding = useStrike(
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
      setTranslate(-currentIndex.current * height)

      return () => {
        stopInertia.current?.()
        stopCorrect.current?.()
      }
    }, [])

    const handleItemClick = (index: number, option: PickerColumnOption) => {
      if (moving.current || option.disabled) {
        return
      }
      setIndex(index, true, true)
    }

    const setIndex = useEvent(
      (index: number, emitChange = false, animated = false) => {
        index = minmax(index, 0, column.length - 1)
        if (index === currentIndex.current) {
          return
        }
        stopInertia.current?.()
        stopCorrect.current?.()
        const to = -index * height

        pickStart()

        toCorrectPosition(to, true, animated, emitChange)
      },
    )

    const setIndexByValue = useEvent(
      (value: any, emitChange?: boolean, animated?: boolean) => {
        column.some((option, index) => {
          if (option[fieldNames.value as string] === value) {
            setIndex(index, emitChange, animated)
            return true
          }
        })
      },
    )

    // no limit, no disabled, no animate, no emit change
    const setIndexForcibly = useEvent((index: number) => {
      if (index === currentIndex.current) {
        return
      }
      stopInertia.current?.()
      stopCorrect.current?.()
      const to = -index * height
      currentIndex.current = index
      setTranslate(to)
    })

    const getIndex = useEvent(() => {
      return currentIndex.current
    })

    const getOption = useEvent(() => {
      return column[currentIndex.current]
    })

    const getColumnIndex = useEvent(() => {
      return columnIndex
    })

    useImperativeHandle(ref, () => ({
      setIndex,
      setIndexByValue,
      setIndexForcibly,
      getIndex,
      getOption,
      getColumnIndex,
    }))

    return (
      <div {...restProps} {...columnBinding} className="s-picker-column">
        <div className="s-picker-mask s-picker-mask-top"></div>
        <div className="s-picker-focus" style={{ height: focusHeight + 'px' }}>
          <div
            className="s-picker-action-area"
            style={{ height: height + 'px' }}
          >
            <div className="s-picker-item-group" ref={groupRef}>
              {column.map((option, i) => {
                columnMap.current[i] = option
                return (
                  <div
                    key={i}
                    className={classNames('s-picker-item', {
                      's-picker-item-disabled': option.disabled,
                    })}
                    style={{ height: height + 'px' }}
                    onClick={() => handleItemClick(i, option)}
                  >
                    {option[fieldNames.label as string]}
                  </div>
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
