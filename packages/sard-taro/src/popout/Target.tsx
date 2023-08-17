import {
  cloneElement,
  useContext,
  FC,
  useEffect,
  isValidElement,
  ReactNode,
  useState,
} from 'react'

import PopoutContext from './PopoutContext'
import { isEmptyValue } from '../utils'

export type PopputTargeMembers = {
  alwaysHasValue?: boolean
  hasOutletChange?: boolean
}
export interface PopoutTargetProps {
  children: ReactNode
  valuePropName?: string
  trigger?: string
  onOutletChange?: (outletValue: any, isManual: boolean) => void
}

export const PopoutTarget: FC<PopoutTargetProps> = (props) => {
  const { children, valuePropName = 'value', trigger = 'onChange' } = props

  const popoutContext = useContext(PopoutContext)

  const {
    value: popoutValue,
    setConfirmDisabled,
    setTarget,
    setOutletValue,
    temporaryOutletValue,
    onChange,
    alwaysHasValue,
    targetRef,
  } = popoutContext

  const [value, setValue] = useState<any>(popoutValue)

  // tips: 不在onChange回调操作，通过监听value变化，可以统一处理onChange和上层组件值的变化
  useEffect(() => {
    setConfirmDisabled(isEmptyValue(value))
    onChange(value)
  }, [value])

  useEffect(() => {
    if (popoutValue !== value) {
      setValue(popoutValue)
    }
  }, [popoutValue])

  useEffect(() => {
    setTarget(true)

    return () => {
      setTarget(false)
    }
  }, [])

  if (isValidElement(children)) {
    const props = {
      [valuePropName]: value,
      [trigger]: (value, ...restArgs) => {
        setValue(value)
        children.props[trigger]?.(value, ...restArgs)
      },
    }

    if ((children.type as PopputTargeMembers)?.alwaysHasValue) {
      props.ref = targetRef
      alwaysHasValue.current = true
    }

    if ((children.type as PopputTargeMembers)?.hasOutletChange) {
      props.onOutletChange = (value, isManual: boolean) => {
        temporaryOutletValue.current = value
        if (!isManual) {
          setOutletValue(value)
        }
      }
    }

    return cloneElement(children, props)
  } else {
    return null
  }
}

export default PopoutTarget
