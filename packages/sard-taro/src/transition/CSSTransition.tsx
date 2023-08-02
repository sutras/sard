import { FC, useState } from 'react'
import classNames from 'classnames'
import { Transition, TransitionProps } from './index'
import { useBem } from '../use'

export interface CSSTransitionProps extends TransitionProps {
  effect?:
    | 'fade'
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'collapse'

  customEffect?: string
}

export const CSSTransition: FC<CSSTransitionProps> = (props) => {
  const {
    className,
    style,
    effect,
    customEffect,
    timeout = 300,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const [bem] = useBem('transition')

  const prefix = bem.m(effect)

  const [clsName, setClsName] = useState('')

  const addClass = (...stages: string[]) => {
    if (effect || customEffect) {
      setClsName(
        stages.map((stage) => (customEffect || prefix) + '-' + stage).join(' '),
      )
    }
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
      style={{ animationDuration: `${timeout}ms`, ...style }}
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
