import { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Transition } from '../transition/index'
import { useEvent } from '../../use'
import { reflow } from '../../utils'

export interface CollapseProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  visible?: boolean
  duration?: number
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

const CLS_SHOW = 's-show'
const CLS_COLLAPSING = 's-collapsing'

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

  const timer = useRef(0)

  const elRef = useRef<HTMLDivElement>(null)

  const handleEnter = useEvent(() => {
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.add(CLS_SHOW)
      const height = el.offsetHeight
      el.style.height = '0px'
      reflow(el)
      el.style.height = height + 'px'
      el.classList.add(CLS_COLLAPSING)
    }
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.remove(CLS_COLLAPSING)
      el.style.height = ''
    }
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    const el = elRef.current
    if (el) {
      const height = el.offsetHeight
      el.style.height = height + 'px'
      reflow(el)
      el.style.height = '0px'
      el.classList.add(CLS_COLLAPSING)
    }
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.remove(CLS_SHOW, CLS_COLLAPSING)
      el.style.height = ''
    }
    onExited?.()
  })

  useEffect(() => {
    if (visible && elRef.current) {
      elRef.current.classList.add(CLS_SHOW)
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const collapseClass = classNames('s-collapse', className)

  const collapseStyle = {
    ...style,
    transitionDuration: duration + 'ms',
  }

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
      <div ref={elRef} className={collapseClass} style={collapseStyle}>
        {children}
      </div>
    </Transition>
  )
}

export default Collapse
