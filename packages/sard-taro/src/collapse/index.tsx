import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Transition } from '../transition/index'
import { useBem, useEvent, useSelectorId } from '../use'
import { getRectById } from '../utils'
import { BaseProps } from '../base'

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

  const collapseId = useSelectorId()

  const [show, setShow] = useState(visible)
  const [collapsing, setCollapsing] = useState(false)
  const [height, setHeight] = useState<number | ''>('')

  const timer = useRef(0)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleEnter = useEvent(() => {
    getRectById(collapseId).then((res) => {
      setHeight(0)
      setShow(true)
      setCollapsing(true)

      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setHeight(res.height)
      }, 100)
    })

    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    setHeight('')
    setCollapsing(false)
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    getRectById(collapseId).then((res) => {
      setHeight(res.height)
      setCollapsing(true)

      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setHeight(0)
      }, 100)
    })

    onExit?.()
  })

  const handleExiting = useEvent(() => {
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    setHeight('')
    setCollapsing(false)
    setShow(false)
    onExited?.()
  })

  return (
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
          height,
          transitionDuration: duration + 'ms',
        }}
      >
        <View className={bem.e('content')} id={collapseId}>
          {children}
        </View>
      </View>
    </Transition>
  )
}

export default Collapse
