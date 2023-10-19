import classNames from 'classnames'
import {
  cloneElement,
  CSSProperties,
  FC,
  useLayoutEffect,
  useRef,
  useState,
  isValidElement,
  ReactNode,
  useMemo,
} from 'react'
import { isFunction, isNumber, noop } from '../utils'

export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'
export const EXITED = 'exited'

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited'

export type TransitionTimeout = number | Timeouts

export interface Timeouts {
  enter: number
  exit: number
  appear?: number
}

export interface TransitionProps {
  className?: string
  style?: CSSProperties
  children?:
    | ReactNode
    | ((
        options: { status: TransitionStatus; timeouts: Timeouts },
        props: { [key: PropertyKey]: any },
      ) => ReactNode)
  in?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  appear?: boolean
  enter?: boolean
  exit?: boolean
  timeout?: TransitionTimeout
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
  [key: PropertyKey]: unknown
}

interface NextCallback {
  (): void
  cancel: () => void
}

export function getTimeouts(timeout: TransitionTimeout) {
  let exit: number, enter: number, appear: number
  exit = enter = appear = timeout as number

  if (timeout !== undefined && !isNumber(timeout)) {
    exit = timeout.exit
    enter = timeout.enter
    appear = timeout.appear ?? enter
  }
  return {
    exit,
    enter,
    appear,
  }
}

export const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    className,
    style,
    in: _in = false,
    mountOnEnter = false,
    unmountOnExit = false,
    appear = false,
    enter = true,
    exit = true,
    timeout = 0,

    onEnter = noop,
    onEntering = noop,
    onEntered = noop,

    onExit = noop,
    onExiting = noop,
    onExited = noop,

    ...restProps
  } = props

  const willAppear = useRef(false)
  const initialUnmount = useRef(false)
  const [status, setStatus] = useState<TransitionStatus>(() => {
    if (_in) {
      if (appear) {
        willAppear.current = true
        return EXITED
      } else {
        return ENTERED
      }
    } else {
      if (unmountOnExit || mountOnEnter) {
        initialUnmount.current = true
      }
      return EXITED
    }
  })

  const timeouts = useMemo(() => getTimeouts(timeout), [timeout])

  const processing = useRef(false)

  const nextCallback = useRef<NextCallback | null>(null)

  const setNextCallback = (callback: () => void) => {
    let active = true
    nextCallback.current = (() => {
      if (active) {
        active = false
        nextCallback.current = null

        callback()
      }
    }) as NextCallback

    nextCallback.current.cancel = () => {
      active = false
    }
    return nextCallback.current
  }

  const finishNextCallback = (_in: boolean) => {
    if (!nextCallback.current) {
      return
    }
    cancelNextCallback()

    processing.current = false

    if (_in) {
      onExited?.()
    } else {
      onEntered?.()
    }
  }

  const cancelNextCallback = () => {
    if (nextCallback.current) {
      nextCallback.current.cancel()
      nextCallback.current = null
    }
  }

  const onTransitionEnd = (timeout: number, handler: () => void) => {
    setTimeout(setNextCallback(handler), timeout)
  }

  useLayoutEffect(() => {
    if (_in) {
      if (status !== ENTERING && status !== ENTERED) {
        finishNextCallback(_in)

        setStatus(ENTERING)
        onEnter?.()

        const timeout = willAppear.current
          ? timeouts.appear
          : enter
          ? timeouts.enter
          : 0
        onTransitionEnd(timeout, () => {
          setStatus(ENTERED)
        })

        if (willAppear.current) {
          willAppear.current = false
        }
      }

      if (status === ENTERING && !processing.current) {
        processing.current = true
        onEntering?.()
      }

      if (status === ENTERED && processing.current) {
        processing.current = false
        onEntered?.()
      }
    } else {
      if (status !== EXITING && status !== EXITED) {
        finishNextCallback(_in)

        setStatus(EXITING)
        onExit?.()

        onTransitionEnd(exit ? timeouts.exit : 0, () => {
          setStatus(EXITED)
        })
      }

      if (status === EXITING && !processing.current) {
        processing.current = true
        onExiting?.()
      }

      if (status === EXITED && processing.current) {
        processing.current = false
        onExited?.()
      }
    }
  })

  useLayoutEffect(() => {
    initialUnmount.current = false
    return cancelNextCallback
  }, [])

  if (initialUnmount.current || (status === EXITED && unmountOnExit)) {
    return null
  }

  if (isFunction(children)) {
    return (
      <>
        {children(
          { status, timeouts },
          {
            ...restProps,
            style,
            className,
          },
        )}
      </>
    )
  }

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...children.props,
      ...restProps,
      className: classNames(children.props.className, className),
      style: {
        ...children.props.style,
        ...style,
      },
    })
  }

  return <>{children}</>
}

export default Transition
