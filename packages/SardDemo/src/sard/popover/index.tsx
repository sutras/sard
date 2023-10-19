import {
  FC,
  ReactElement,
  useState,
  cloneElement,
  useLayoutEffect,
  CSSProperties,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Menu, MenuOption } from '../menu'
import { useBem, useControllableValue, useEvent, useSetTimeout } from '../use'
import { getRectByElement, isNumber, isRN } from '../utils'

import { Placement, getPopoverPosition } from './utils'
import { BaseProps } from '../base'
import Popup, { PopupProps } from '../popup'
import { Animated } from '../animated'
import { Timeouts, getTimeouts } from '../transition'

export type { Placement as PopoverPlacement, MenuOption as PopoverOption }

function mayAddPixel(value: string | number) {
  return isNumber(value) ? value + 'px' : value
}

export interface PopoverProps extends BaseProps, PopupProps {
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

const zoomAnim = (timeouts: Timeouts) => {
  const opacityValue = new Animated.Value(0)
  const scaleValue = new Animated.Value(0.5)

  return {
    enter() {
      opacityValue.setValue(0)
      scaleValue.setValue(0.4)
      Animated.parallel(
        [
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: timeouts.enter,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: timeouts.enter,
            useNativeDriver: true,
          }),
        ],
        {
          stopTogether: false,
        },
      ).start()
    },
    exit() {
      Animated.parallel(
        [
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: timeouts.exit,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.4,
            duration: timeouts.exit,
            useNativeDriver: true,
          }),
        ],
        {
          stopTogether: false,
        },
      ).start(({ finished }) => {
        if (finished) {
          scaleValue.setValue(1)
        }
      })
    },
    style: {
      opacity: opacityValue,
      scale: scaleValue,
    },
  }
}

export const Popover: FC<PopoverProps> = (props) => {
  const {
    className,
    style,
    children,
    contentClass,
    contentStyle,

    options = [],
    reference,
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
    duration = 250,

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

  const referenceRef = useRef()
  const contentRef = useRef()

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  // visible -> realVisible -> !visible -> !realVisible
  const [realVisible, setRealVisible] = useState(false)

  const handleRequestClose = useEvent(() => {
    setInnerVisible(false)
  })

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    setInnerVisible(false)
    onMaskClick?.(event)
  })

  const [popperRect, setPopperRect] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })
  const [arrowPosition, setArrowPosition] = useState<{
    top: number
    left: number
  }>({ top: 0, left: 0 })

  const getAndSetPosition = async () => {
    const referenceRect = await getRectByElement(referenceRef.current)
    const contentRect = await getRectByElement(contentRef.current)

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
      setPopperRect({
        ...popperPosition,
        width: contentRect.width,
        height: contentRect.height,
      })
      setArrowPosition(arrowPosition)
      setRealVisible(true)
      onEntering?.()
      showLater()
    }
  }

  const [hideLater, cancelHide] = useSetTimeout(
    () => {
      setRealVisible(false)
      onExited?.()
    },
    duration,
    {
      tailing: true,
    },
  )

  const [showLater, cancelShow] = useSetTimeout(
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
      cancelHide()
      onEnter?.()
      getAndSetPosition()
    } else {
      cancelShow()
      onExit?.()
      anim.exit()
      hideLater()
      onExiting?.()
    }
  }, [innerVisible])

  const handleSelect = (option) => {
    setInnerVisible(false)
    onSelect?.(option)
  }

  // Animated >>>
  const anim = useMemo(() => zoomAnim(getTimeouts(duration)), [])

  useEffect(() => {
    if (realVisible) {
      anim.enter()
    }
  }, [realVisible])
  // <<< Animated

  const getOriginX = () => {
    return popperRect.width / 2 - arrowPosition.left
  }

  const getOriginY = () => {
    return popperRect.height / 2 - arrowPosition.top
  }

  return (
    <>
      {reference &&
        cloneElement(reference, {
          ref: referenceRef,
          onClick(event) {
            setInnerVisible(true)
            reference.props.onClick?.(event)
          },
        })}

      <Popup
        visible={innerVisible || realVisible}
        timeout={duration}
        mask={mask}
        maskStyle={maskStyle}
        maskClass={maskClass}
        transparent={transparent}
        onMaskClick={handleMaskClick}
        onRequestClose={handleRequestClose}
        zIndex={zIndex}
        catchMove
        {...restProps}
        className={classNames(bem.e('popup'), className)}
        style={style}
        contentClass={classNames(
          bem.b(),
          bem.m(theme),
          bem.m('zoom-enter', realVisible),
          bem.m('zoom-exit', !innerVisible),
          contentClass,
        )}
        contentStyle={{
          top: popperRect.top,
          left: popperRect.left,
          ...contentStyle,
          display: innerVisible || realVisible ? 'flex' : 'none',
          opacity: realVisible ? 1 : 0,
          ...(isRN
            ? ({
                opacity: anim.style.opacity,
                transform: [
                  {
                    translateX: -getOriginX(),
                  },
                  {
                    translateY: -getOriginY(),
                  },
                  {
                    scale: anim.style.scale,
                  },
                  {
                    translateX: getOriginX(),
                  },
                  {
                    translateY: getOriginY(),
                  },
                ],
              } as any)
            : {
                transformOrigin: `${mayAddPixel(
                  arrowPosition.left,
                )} ${mayAddPixel(arrowPosition.top)}`,
                animationDuration: duration + 'ms',
              }),
        }}
      >
        <View
          className={classNames(bem.e('content'), bem.em('content', direction))}
          ref={contentRef}
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
        <View
          className={classNames(bem.e('arrow'), bem.m(theme))}
          style={arrowPosition}
        />
      </Popup>
    </>
  )
}

export default Popover
