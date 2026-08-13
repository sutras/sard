import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Steps from './steps.vue'
import _Step from './step.vue'

export const Steps: EnhancedComponent<typeof _Steps> = enhanceComponent(_Steps)
export const Step: EnhancedComponent<typeof _Step> = enhanceComponent(_Step)
export default Steps

export type {
  StepsProps,
  StepsSlots,
  StepsContext,
  StepsStatus,
  StepsItem,
  StepProps,
  StepSlots,
  StepEmits,
  StepExpose,
} from './common'
