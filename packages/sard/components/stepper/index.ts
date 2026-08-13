import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Stepper from './stepper.vue'

export const Stepper: EnhancedComponent<typeof _Stepper> = enhanceComponent(_Stepper)
export default Stepper

export type { StepperProps, StepperEmits } from './common'
