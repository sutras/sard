import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Radio from './radio.vue'
import _RadioGroup from './radio-group.vue'

export const Radio: EnhancedComponent<typeof _Radio> = enhanceComponent(_Radio)
export const RadioGroup: EnhancedComponent<typeof _RadioGroup> = enhanceComponent(_RadioGroup)
export default Radio

export type {
  RadioProps,
  RadioSlots,
  RadioEmits,
  RadioGroupProps,
  RadioGroupSlots,
  RadioGroupEmits,
} from './common'
