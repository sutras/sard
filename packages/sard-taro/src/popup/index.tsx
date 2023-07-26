import { useState, CSSProperties, FC, forwardRef } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { useEvent } from '../use'
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
  clearMask?: boolean
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
      clearMask,
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
      'sar-popup',
      {
        'sar-popup-show': popupVisible,
        'sar-popup-hiding': isHiding,
      },
      `sar-popup-${effect}`,
      className,
    )

    const popupStyle = {
      zIndex,
      ...style,
    }

    const innerMaskClass = classNames(
      'sar-popup-mask',
      {
        'sar-popup-mask-show': popupVisible,
        'sar-popup-hiding': isHiding,
        'sar-popup-clear-mask': clearMask,
      },
      maskClass,
    )

    const innerMaskStyle = {
      zIndex,
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
