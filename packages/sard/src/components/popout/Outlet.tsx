import { useContext, FC, useEffect } from 'react'

import PopoutContext, { PopoutCallbackParams } from './PopoutContext'

export interface PopoutOutletProps {
  children?: (params: PopoutCallbackParams) => any
}

export const PopoutOutlet: FC<PopoutOutletProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  useEffect(() => {
    popoutContext.setOutlet(
      typeof children === 'function' ? children(popoutContext) : null,
    )
  }, [popoutContext])

  return null
}

export default PopoutOutlet
