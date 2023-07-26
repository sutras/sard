import { FC, useState } from 'react'
import classNames from 'classnames'
import { Transition, TransitionProps } from './index'

export interface CSSTransitionProps extends TransitionProps {
  effect?:
    | 'fade'
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'collapse'

  name?: string
}

export const CSSTransition: FC<CSSTransitionProps> = (props) => {
  const {
    className,
    effect = 'fade',
    name,
    timeout = 300,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const prefix = 'sar-transition-' + effect

  const [clsName, setClsName] = useState('')

  const addClass = (...stages: string[]) => {
    setClsName(stages.map((stage) => (name || prefix) + '-' + stage).join(' '))
  }

  const handleEnter = () => {
    addClass('enter')
    onEnter?.()
  }

  const handleEntering = () => {
    addClass('entering')
    onEntering?.()
  }

  const handleEntered = () => {
    addClass('entered')
    onEntered?.()
  }

  const handleExit = () => {
    addClass('exit')
    onExit?.()
  }

  const handleExiting = () => {
    addClass('exiting')
    onExiting?.()
  }

  const handleExited = () => {
    addClass('exited')
    onExited?.()
  }

  return (
    <Transition
      {...restProps}
      timeout={timeout}
      className={classNames(clsName, className)}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    ></Transition>
  )
}

export default CSSTransition
