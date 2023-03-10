import {
  ReactElement,
  Children,
  cloneElement,
  useContext,
  FC,
  useEffect,
} from 'react'

import PopoutContext from './PopoutContext'

export interface PopoutBridgeProps {
  children: ReactElement
  valuePropName?: string
  trigger?: string
}

export const PopoutTarget: FC<PopoutBridgeProps> = (props) => {
  const { children, valuePropName = 'value', trigger = 'onChange' } = props

  const popoutContext = useContext(PopoutContext)

  useEffect(() => {
    popoutContext.setTarget(true)

    return () => {
      popoutContext.setTarget(false)
    }
  }, [])

  try {
    const element = Children.only(children)
    return cloneElement(element, {
      [valuePropName]: popoutContext.bridgeValue,
      [trigger]: (...args) => {
        popoutContext.handleChange(args)
        element.props[trigger]?.(...args)
      },
    })
  } catch {
    return null
  }
}

export default PopoutTarget
