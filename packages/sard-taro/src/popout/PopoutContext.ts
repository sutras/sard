import { createContext, MutableRefObject, ReactElement } from 'react'
import { AnyFunction } from '../base'

export type TargetElementRefVal = ReactElement & {
  getTriggerArgsForcibly?: AnyFunction
}

export interface PopoutContexValue {
  visible: boolean
  setVisible: (visible: boolean) => void
  value: any
  setValue: (value?: any) => void
  onChange: AnyFunction
  setConfirmDisabled: (disabled: boolean) => void
  setOutlet: (outlet: any) => void
  setTarget: (target: any) => void
  outletValue: any
  setOutletValue: (value: any) => void
  temporaryOutletValue: MutableRefObject<any>
  alwaysHasValue: MutableRefObject<boolean>
  targetRef: MutableRefObject<any>
}

export const PopoutContext = createContext<PopoutContexValue>(null)

export default PopoutContext
