import { FC, useState } from 'react'
import classNames from 'classnames'
import { Transition, TransitionProps } from './index'
import { useBem } from '../use'
import { View } from '@tarojs/components'
import { isFunction } from '../utils'

export interface CSSTransitionProps extends TransitionProps {
  effect?:
    | 'fade'
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
}

export const CSSTransition: FC<CSSTransitionProps> = (props) => {
  const {
    children,
    className,
    style,
    in: _in,
    timeout = 300,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,

    effect,
    ...restProps
  } = props

  const [bem] = useBem('transition')

  const prefix = bem.m(effect)

  const [clsName, setClsName] = useState('')

  const addClass = (...stages: string[]) => {
    if (effect) {
      setClsName(stages.map((stage) => prefix + '-' + stage).join(' '))
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
      in={_in}
      timeout={timeout}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {({ status, timeouts }, props) => (
        <View
          {...props}
          style={{
            ...style,
            animationDuration: `${_in ? timeouts.enter : timeouts.exit}ms`,
          }}
          className={classNames(clsName, className)}
        >
          {isFunction(children)
            ? children({ status, timeouts }, restProps)
            : children}
        </View>
      )}
    </Transition>
  )
}

export default CSSTransition
