import { useContext, FC, useEffect, ReactNode, useMemo } from 'react'

import { PopoutContext, PopoutContexValue } from './PopoutContext'
import { isFunction } from '../utils'

type PopoutOutletCallbackParams = Pick<
  PopoutContexValue,
  'value' | 'triggerArgs' | 'setValue' | 'setVisible'
>

export interface PopoutOutletProps {
  children?: (params: PopoutOutletCallbackParams) => ReactNode
}

export const PopoutOutlet: FC<PopoutOutletProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  const callbackParams = useMemo<PopoutOutletCallbackParams>(() => {
    return {
      value: popoutContext.value,
      triggerArgs: popoutContext.triggerArgs,
      setValue: popoutContext.setValue,
      setVisible: popoutContext.setVisible,
    }
  }, [popoutContext])

  useEffect(() => {
    popoutContext.setOutlet(
      isFunction(children) ? children(callbackParams) : null,
    )
  }, [popoutContext])

  return null
}

export default PopoutOutlet
