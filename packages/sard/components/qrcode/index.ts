import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Qrcode from './qrcode.vue'

export const Qrcode: EnhancedComponent<typeof _Qrcode> = enhanceComponent(_Qrcode)
export default Qrcode

export type { QrcodeProps, QrcodeSlots, QrcodeECL } from './common'
