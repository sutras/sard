import {
  FC,
  ReactElement,
  useState,
  cloneElement,
  useLayoutEffect,
  CSSProperties,
} from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Menu, MenuOption } from '../menu'
import {
  useBem,
  useControllableValue,
  useEvent,
  useSelectorId,
  useSetTimeout,
  useUpdateEffect,
} from '../use'
import { getRectById, isNumber } from '../utils'

import { Placement, getPopoverPosition } from './utils'
import Mask from '../mask'
import { BaseProps } from '../base'

export type { Placement as PopoverPlacement, MenuOption as PopoverOption }

function mayAddPixel(value: string | number) {
  return isNumber(value) ? value + 'px' : value
}

export interface PopoverProps extends BaseProps {
  options?: MenuOption[]
  reference?: ReactElement
  refGap?: number
  viewportGap?: number
  placement?: Placement
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  zIndex?: number
  onSelect?: (option: MenuOption) => void

  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  duration?: number

  mask?: boolean
  transparent?: boolean
  maskClass?: string
  maskStyle?: CSSProperties
  onMaskClick?: (event: ITouchEvent) => void

  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Popover: FC<PopoverProps> = (props) => {
  const {
    options = [],
    reference,
    className,
    style,
    children,
    refGap = 10,
    viewportGap = 10,
    placement = 'bottom',
    direction = 'vertical',
    theme = 'light',
    zIndex,
    onSelect,

    visible,
    defaultVisible,
    onVisible,
    duration = 150,

    mask = true,
    transparent = true,
    maskClass,
    maskStyle,
    onMaskClick,

    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const [bem] = useBem('popover')

  const referenceId = useSelectorId()
  const contentId = useSelectorId()
  const mergedReferenceId = reference?.props.id || referenceId

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  // visible -> realVisible -> !visible -> !realVisible
  const [realVisible, setRealVisible] = useState(false)

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    setInnerVisible(false)
    onMaskClick?.(event)
  })

  const [popperPosition, setPopperPosition] = useState({ top: 0, left: 0 })
  const [arrowPosition, setArrowPosition] = useState<{
    top: number | string
    left: number | string
  }>({ top: 0, left: 0 })

  const getAndSetPosition = async () => {
    const referenceRect = await getRectById(mergedReferenceId)
    const contentRect = await getRectById(contentId)
    if (referenceRect) {
      const [popperPosition, arrowPosition] = getPopoverPosition(
        referenceRect,
        contentRect,
        {
          refGap,
          viewportGap,
          placement,
        },
      )
      setPopperPosition(popperPosition)
      setArrowPosition(arrowPosition)
    }
  }

  const [hideReset, hideClear] = useSetTimeout(
    () => {
      setRealVisible(false)
      onExited?.()
    },
    duration,
    {
      tailing: true,
    },
  )

  const [showReset, showClear] = useSetTimeout(
    () => {
      onEntered?.()
    },
    duration,
    {
      tailing: true,
    },
  )

  useLayoutEffect(() => {
    if (innerVisible) {
      hideClear()
      onEnter?.()
      getAndSetPosition()
    } else {
      showClear()
      onExit?.()
      onExiting?.()
      hideReset()
    }
  }, [innerVisible])

  useUpdateEffect(() => {
    setRealVisible(true)
    onEntering?.()
    showReset()
  }, [popperPosition])

  const handleSelect = (option) => {
    setInnerVisible(false)
    onSelect?.(option)
  }

  return (
    <>
      {reference &&
        cloneElement(reference, {
          id: mergedReferenceId,
          onClick(event) {
            setInnerVisible(true)
            reference.props.onClick?.(event)
          },
        })}

      {mask && (
        <Mask
          visible={innerVisible}
          timeout={duration}
          style={maskStyle}
          className={maskClass}
          transparent={transparent}
          onClick={handleMaskClick}
          zIndex={zIndex}
        />
      )}

      <View
        catchMove
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m(theme),
          bem.m('zoom-enter', realVisible),
          bem.m('zoom-exit', !innerVisible),
          className,
        )}
        style={{
          ...popperPosition,
          display: innerVisible || realVisible ? 'flex' : 'none',
          opacity: realVisible ? 1 : 0,
          transformOrigin: `${mayAddPixel(arrowPosition.left)} ${mayAddPixel(
            arrowPosition.top,
          )}`,
          animationDuration: duration + 'ms',
          zIndex,
          ...style,
        }}
      >
        <View
          className={classNames(bem.e('content'), bem.em('content', direction))}
          id={contentId}
        >
          {children ?? (
            <Menu
              options={options}
              direction={direction}
              theme={theme}
              onSelect={handleSelect}
            />
          )}
        </View>
        <View className={classNames(bem.e('arrow'))} style={arrowPosition} />
      </View>
    </>
  )
}

export default Popover
