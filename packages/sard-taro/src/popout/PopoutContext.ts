import { createContext, MutableRefObject, ReactElement } from 'react'
import { AnyFunction, AnyType } from '../base'

export type TargetElementRefVal = ReactElement & {
  getTriggerArgsForcibly?: AnyFunction
}

export interface PopoutContexValue {
  visible: boolean
  value: AnyType
  bridgeValue: AnyType
  triggerArgs: AnyType[]
  setValue: (value?: AnyType) => void
  setVisible: (visible: boolean) => void
  setOutlet: (outlet: AnyType) => void
  setTarget: (target: AnyType) => void
  setTriggerArgs: (args: AnyType[]) => void
  handleChange: AnyFunction
  setAlwaysHasValue: (enable: boolean) => void
  targetElementRef: MutableRefObject<TargetElementRefVal>
}

export const PopoutContext = createContext<PopoutContexValue>(null)

export default PopoutContext
