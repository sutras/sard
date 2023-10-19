import { ActionSheet, ActionSheetProps, ActionSheetRef } from './ActionSheet'
import { useAgent, AgentProps, MapIdAgent } from '../utils/imperative'

export const mapIdAgent: MapIdAgent<ActionSheetProps, ActionSheetRef> = {}

export const ActionSheetAgent = (agentProps: AgentProps<ActionSheetProps>) => {
  return useAgent<ActionSheetProps, ActionSheetRef>(
    ActionSheet,
    agentProps,
    mapIdAgent,
    'actionSheet',
  )
}

export default ActionSheetAgent
