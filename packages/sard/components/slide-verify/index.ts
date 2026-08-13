import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _SlideVerify from './slide-verify.vue'

export const SlideVerify: EnhancedComponent<typeof _SlideVerify> = enhanceComponent(_SlideVerify)
export default SlideVerify

export type {
  SlideVerifyProps,
  SlideVerifySlots,
  SlideVerifyEmits,
  SlideVerifyExpose,
  SlideVerifyResult,
} from './common'
