import { Dialog, DialogProps, DialogRef } from './Dialog'
import { useAgent, AgentProps, MapIdAgent } from '../utils/imperative'

export const mapIdAgent: MapIdAgent<DialogProps, DialogRef> = {}

export const DialogAgent = (agentProps: AgentProps<DialogProps>) => {
  return useAgent<DialogProps, DialogRef>(
    Dialog,
    agentProps,
    mapIdAgent,
    'dialog',
  )
}

export default DialogAgent
