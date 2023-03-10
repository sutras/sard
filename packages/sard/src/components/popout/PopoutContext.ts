import { createContext } from 'react'

export interface PopoutCallbackParams {
  value: any
  bridgeValue: any
  triggerArgs: any[]
  setValue: (value?: any) => void
  setVisible: (visible: boolean) => void
  setOutlet: (outlet: any) => void
  setTarget: (target: any) => void
  handleChange: (args: any[]) => void
}

const Contex = createContext<PopoutCallbackParams>(null)

export default Contex
