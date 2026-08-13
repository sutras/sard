import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _RotateVerify from './rotate-verify.vue'

export const RotateVerify: EnhancedComponent<typeof _RotateVerify> = enhanceComponent(_RotateVerify)
export default RotateVerify

export type {
  RotateVerifyProps,
  RotateVerifySlots,
  RotateVerifyEmits,
  RotateVerifyExpose,
} from './common'
