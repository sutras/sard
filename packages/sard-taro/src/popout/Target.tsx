import {
  cloneElement,
  useContext,
  FC,
  useEffect,
  isValidElement,
  ReactNode,
} from 'react'

import PopoutContext from './PopoutContext'

export type PopputTargeMembers = {
  alwaysHasValue?: boolean
  canListenOuterValueChange?: boolean
}
export interface PopoutTargetProps {
  children: ReactNode
  valuePropName?: string
  trigger?: string
}

export const PopoutTarget: FC<PopoutTargetProps> = (props) => {
  const { children, valuePropName = 'value', trigger = 'onChange' } = props

  const popoutContext = useContext(PopoutContext)

  useEffect(() => {
    popoutContext.setTarget(true)

    return () => {
      popoutContext.setTarget(false)
    }
  }, [])

  useEffect(() => {
    popoutContext.setAlwaysHasValue(
      isValidElement(children) &&
        (children.type as PopputTargeMembers).alwaysHasValue,
    )
  }, [children])

  if (isValidElement(children)) {
    const sourceType = children.type as PopputTargeMembers

    const props = {
      [valuePropName]: popoutContext.bridgeValue,
      [trigger]: (...args) => {
        popoutContext.handleChange(args)
        children.props[trigger]?.(...args)
      },
    }

    if (sourceType.canListenOuterValueChange) {
      props.onOuterValueChange = (...args) => {
        popoutContext.setTriggerArgs(args)
      }
    }

    if (sourceType.alwaysHasValue) {
      props.ref = popoutContext.targetElementRef
    }

    return cloneElement(children, props)
  } else {
    return null
  }
}

export default PopoutTarget
