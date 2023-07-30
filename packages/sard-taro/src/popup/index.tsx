import { useState, CSSProperties, FC, forwardRef } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem, useEvent } from '../use'
import { CSSTransition } from '../transition/CSSTransition'
import { BaseProps } from '../base'

export interface PopupProps extends BaseProps {
  visible?: boolean
  timeout?: number
  effect?:
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'fade'
  zIndex?: number
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

export type PopupRef = typeof View

export const Popup: FC<PopupProps> = forwardRef<PopupRef, PopupProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      visible = false,
      zIndex,
      timeout = 300,
      effect = 'zoom',
      mask = true,
      transparent,
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

    const [bem] = useBem('popup')

    const [popupVisible, setPopupVisible] = useState(visible)
    const [isHiding, setIsHiding] = useState(!visible)

    const handleMaskClick = useEvent((event: ITouchEvent) => {
      onMaskClick?.(event)
    })

    const handleEnter = useEvent(() => {
      setIsHiding(false)
      setPopupVisible(true)
      onEnter?.()
    })

    const handleEntering = useEvent(() => {
      onEntering?.()
    })

    const handleEntered = useEvent(() => {
      onEntered?.()
    })

    const handleExit = useEvent(() => {
      setIsHiding(true)
      onExit?.()
    })

    const handleExiting = useEvent(() => {
      onExiting?.()
    })

    const handleExited = useEvent(() => {
      setIsHiding(false)
      setPopupVisible(false)
      onExited?.()
    })

    const popupClass = classNames(
      bem.b(),
      bem.m('hiding', isHiding),
      bem.m(effect),
      className,
    )

    const popupStyle = {
      zIndex,
      display: popupVisible ? 'flex' : 'none',
      ...style,
    }

    const innerMaskClass = classNames(
      bem.e('mask'),
      bem.m('hiding', isHiding),
      bem.em('mask', 'transparent', transparent),
      maskClass,
    )

    const innerMaskStyle = {
      zIndex,
      display: popupVisible ? 'flex' : 'none',
      ...maskStyle,
    }

    return (
      <>
        <CSSTransition in={visible} timeout={timeout} effect="fade">
          {mask ? (
            <View
              className={innerMaskClass}
              style={innerMaskStyle}
              onClick={handleMaskClick}
              catchMove
            ></View>
          ) : null}
        </CSSTransition>

        <CSSTransition
          in={visible}
          timeout={timeout}
          effect={effect}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <View
            {...restProps}
            className={popupClass}
            style={popupStyle}
            ref={ref}
          >
            {children}
          </View>
        </CSSTransition>
      </>
    )
  },
)

export default Popup
