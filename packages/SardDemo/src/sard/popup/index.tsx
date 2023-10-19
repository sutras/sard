import { useState, CSSProperties, forwardRef, useEffect } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem, useEvent } from '../use'
import { BaseProps } from '../base'
import { filterNullish, isRN } from '../utils'
import { CSSTransition } from '../transition/CSSTransition'
import { TransitionTimeout } from '../transition'
import Mask from '../mask'
import Modal from '../modal'

export interface PopupProps extends BaseProps {
  visible?: boolean
  timeout?: TransitionTimeout
  effect?:
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'fade'
  contentClass?: string
  contentStyle?: CSSProperties
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
  catchMove?: boolean
  onlyPopup?: boolean
  onRequestClose?: () => void
}

export type PopupRef = typeof View

export const Popup = forwardRef<PopupRef, PopupProps>((props, ref) => {
  const {
    className,
    style,
    children,

    visible = false,
    zIndex,
    contentClass,
    contentStyle,
    timeout = 300,
    effect,
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
    onlyPopup,
    onRequestClose,
    ...restProps
  } = props

  const [bem] = useBem('popup')

  const [transitionVisible, setTransitionVisible] = useState(visible)
  const [realVisible, setRealVisible] = useState(visible)

  useEffect(() => {
    setTransitionVisible(visible)
  }, [visible])

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    onMaskClick?.(event)
  })

  const handleEnter = useEvent(() => {
    setRealVisible(true)
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    setRealVisible(false)
    onExited?.()
  })

  const renderPopup = () => {
    return (
      <View
        className={classNames(bem.b(), bem.m(effect, effect), className)}
        style={{
          ...style,
          display: visible || realVisible ? 'flex' : 'none',
          ...(!isRN
            ? {
                visibility:
                  transitionVisible || realVisible ? 'visible' : 'hidden',
              }
            : null),
          ...filterNullish({
            zIndex,
          }),
        }}
      >
        {mask && (
          <Mask
            visible={transitionVisible}
            zIndex={zIndex}
            timeout={timeout}
            transparent={transparent}
            onClick={handleMaskClick}
            className={maskClass}
            style={maskStyle}
          />
        )}
        <CSSTransition
          in={transitionVisible}
          appear
          timeout={timeout}
          effect={effect}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
          {...restProps}
          className={classNames(
            bem.e('content'),
            bem.em('content', effect, effect),
            contentClass,
          )}
          style={contentStyle}
          ref={ref}
        >
          {children}
        </CSSTransition>
      </View>
    )
  }

  if (onlyPopup) {
    return renderPopup()
  }

  return (
    <Modal visible={realVisible || visible} onRequestClose={onRequestClose}>
      {renderPopup()}
    </Modal>
  )
})

export default Popup
