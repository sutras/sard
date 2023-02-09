import { FC, useState } from 'react'
import classNames from 'classnames'
import { Transition, TransitionProps } from './index'

export interface CSSTransitionProps extends TransitionProps {
  type?:
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
    type = 'fade',
    name,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const prefix = 's-transition-' + type

  const [className, setClassName] = useState('')

  const addClass = (...stages: string[]) => {
    setClassName(
      stages.map((stage) => (name || prefix) + '-' + stage).join(' '),
    )
  }

  const handleEnter = () => {
    addClass('enter')
    onEnter?.()
  }

  const handleEntering = () => {
    addClass('enter', 'entering')
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
    addClass('exit', 'exiting')
    onExiting?.()
  }

  const handleExited = () => {
    addClass('exited')
    onExited?.()
  }

  const mergeProps = (props: any, restProps: any) => {
    restProps.className = classNames(props.className, restProps.className)
    return Object.assign({}, props, restProps)
  }

  return (
    <Transition
      {...restProps}
      className={className}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
      mergeProps={mergeProps}
    ></Transition>
  )
}

export default CSSTransition
