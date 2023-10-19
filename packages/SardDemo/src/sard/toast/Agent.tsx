import { Toast, ToastProps, ToastRef } from './Toast'
import { useAgent, AgentProps, MapIdAgent } from '../utils/imperative'

export const mapIdAgent: MapIdAgent<ToastProps, ToastRef> = {}

export const ToastAgent = (agentProps: AgentProps<ToastProps>) => {
  return useAgent<ToastProps, ToastRef>(Toast, agentProps, mapIdAgent, 'toast')
}

export default ToastAgent
