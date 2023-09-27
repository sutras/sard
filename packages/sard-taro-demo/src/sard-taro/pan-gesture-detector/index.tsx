import { FC, ReactElement, cloneElement, isValidElement } from 'react'
import { Handlers } from './usePan'

export interface PanGestureDetectorProps {
  children?: ReactElement
  handlers: Handlers
}

export const PanGestureDetector: FC<PanGestureDetectorProps> = (props) => {
  const { children, handlers } = props

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...handlers,
    })
  }

  return null
}

export default PanGestureDetector
