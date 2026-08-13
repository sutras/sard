import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Signature from './signature.vue'

export const Signature: EnhancedComponent<typeof _Signature> = enhanceComponent(_Signature)
export default Signature

export type { SignatureProps, SignatureSlots, SignatureEmits, SignatureExpose } from './common'
