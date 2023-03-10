import {
  ReactNode,
  useState,
  CSSProperties,
  useRef,
  FC,
  MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { CSSTransition } from '../transition/CSSTransition'
import useLockScroll from '../../use/useLockScroll'

const aniClass = {
  top: 'slide-top',
  right: 'slide-right',
  bottom: 'slide-bottom',
  left: 'slide-left',
  center: 'zoom',
  'center-fade': 'fade',
}

export interface PopupProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  visible?: boolean
  lockScroll?: boolean
  zIndex?: number
  duration?: number
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'center' | 'center-fade'
  mask?: boolean
  maskClass?: string
  maskStyle?: CSSProperties
  contentClass?: string
  contentStyle?: CSSProperties
  container?: Element
  onMaskClick?: (event: MouseEvent) => void
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Popup: FC<PopupProps> = (props) => {
  const {
    className,
    style,
    children,
    visible = false,
    lockScroll = true,
    zIndex,
    duration = 300,
    placement = 'center',
    mask = true,
    maskClass,
    maskStyle,
    contentClass,
    contentStyle,
    container = document.body,
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

  const popupRef = useRef<HTMLElement>()

  const { lock, unlock } = useLockScroll(popupRef, 'popup-lock-scroll')

  const handleMaskClick = useEvent((event: MouseEvent) => {
    onMaskClick?.(event)
  })

  const handleEnter = useEvent(() => {
    setIsHiding(false)
    setPopupVisible(true)
    if (lockScroll) {
      lock()
    }
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
    unlock()
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

  const dialogRef = useRef<HTMLDivElement>(null)

  const popupClass = classNames(
    's-popup',
    {
      's-popup-visible': popupVisible,
      's-popup-hiding': isHiding,
    },
    className,
  )

  const popupStyle = {
    zIndex,
    ...style,
  }
  const dialogClass = classNames('s-popup-dialog', `s-popup-${placement}`)

  const render = (
    <div
      className={popupClass}
      ref={popupRef as any}
      style={popupStyle}
      {...restProps}
    >
      <CSSTransition in={visible} timeout={duration} type="fade">
        {mask ? (
          <div
            className={classNames('s-popup-mask', maskClass)}
            style={{
              ...maskStyle,
            }}
            onClick={handleMaskClick}
          ></div>
        ) : null}
      </CSSTransition>
      <div className={dialogClass} ref={dialogRef}>
        <CSSTransition
          in={visible}
          timeout={duration}
          type={aniClass[placement] as any}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div
            className={classNames('s-popup-content', contentClass)}
            style={contentStyle}
          >
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )

  return createPortal(render, container)
}

export default Popup
