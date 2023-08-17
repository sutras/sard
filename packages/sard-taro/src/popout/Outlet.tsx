import { useContext, FC, useEffect, ReactNode, useMemo } from 'react'

import { PopoutContext, PopoutContexValue } from './PopoutContext'
import { isFunction } from '../utils'

type PopoutOutletCallbackParams = Pick<
  PopoutContexValue,
  'setValue' | 'setVisible' | 'outletValue'
>

export interface PopoutOutletProps {
  children?: (params: PopoutOutletCallbackParams) => ReactNode
}

export const PopoutOutlet: FC<PopoutOutletProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  const { outletValue, setValue, setVisible } = popoutContext

  const callbackParams = useMemo<PopoutOutletCallbackParams>(() => {
    return {
      outletValue,
      setValue,
      setVisible,
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
