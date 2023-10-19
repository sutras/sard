import { Notify, NotifyProps, NotifyRef } from './Notify'
import { useAgent, AgentProps, MapIdAgent } from '../utils/imperative'

export const mapIdAgent: MapIdAgent<NotifyProps, NotifyRef> = {}

export const NotifyAgent = (agentProps: AgentProps<NotifyProps>) => {
  return useAgent<NotifyProps, NotifyRef>(
    Notify,
    agentProps,
    mapIdAgent,
    'notify',
  )
}

export default NotifyAgent
