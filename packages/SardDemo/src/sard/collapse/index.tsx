import { FC, useRef, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Transition } from '../transition/index'
import { useBem, useEvent, useSelectorId, useSetTimeout } from '../use'
import { filterNullish, getRectByElement } from '../utils'
import { BaseProps } from '../base'
import CustomWrapper from '../custom-wrapper'

export interface CollapseProps extends BaseProps {
  visible?: boolean
  duration?: number
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Collapse: FC<CollapseProps> = (props) => {
  const {
    className,
    style,
    children,
    visible,
    duration = 500,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const [bem] = useBem('collapse')

  const collapseRef = useRef(null)
  const contextId = useSelectorId()

  const [show, setShow] = useState(visible)
  const [collapsing, setCollapsing] = useState(false)
  const [height, setHeight] = useState<number>()

  const [setHeightLater] = useSetTimeout((height) => {
    setHeight(height)
  }, 100)

  const handleEnter = useEvent(() => {
    getRectByElement(collapseRef.current, contextId).then((res) => {
      setHeight(0)
      setShow(true)
      setCollapsing(true)

      setHeightLater(res.height)
    })

    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    setHeight(undefined)
    setCollapsing(false)
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    getRectByElement(collapseRef.current, contextId).then((res) => {
      setHeight(res.height)
      setCollapsing(true)

      setHeightLater(0)
    })

    onExit?.()
  })

  const handleExiting = useEvent(() => {
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    setHeight(undefined)
    setCollapsing(false)
    setShow(false)
    onExited?.()
  })

  return (
    <CustomWrapper id={contextId}>
      <Transition
        {...restProps}
        timeout={duration}
        in={visible}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        onExited={handleExited}
      >
        <View
          className={classNames(
            bem.b(),
            bem.m('show', show),
            bem.m('collapsing', collapsing),
            className,
          )}
          style={{
            ...style,
            ...filterNullish({
              height,
            }),
            transitionDuration: duration + 'ms',
          }}
        >
          <View className={bem.e('content')} ref={collapseRef}>
            {children}
          </View>
        </View>
      </Transition>
    </CustomWrapper>
  )
}

export default Collapse
